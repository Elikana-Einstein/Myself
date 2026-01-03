import { getDBConnection } from "./db.js";
export const createTables=async () => {
    const db = await getDBConnection();
    db.execAsync(
        `CREATE TABLE IF NOT EXISTS diary(
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            diaryEntry  TEXT,
            date  TEXT
        )`
    )
    db.execAsync(
        `CREATE TABLE IF NOT EXISTS journal(
            id  INTEGER PRIMARY KEY AUTOINCREMENT,
            journalEntry  TEXT,
            date  TEXT

        )`
    ) 
    db.execAsync(
        `CREATE TABLE IF NOT EXISTS goals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    goal TEXT,
    duration TEXT,
    achieved INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    db.execAsync(
    `CREATE TABLE IF NOT EXISTS shopping (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item TEXT,
    quantity INTEGER,
    price INTEGER,
    itemId INTEGER,
    FOREIGN KEY (itemId) REFERENCES shoppingDate(id)
        )`
    )
    
    db.execAsync(
    `CREATE TABLE IF NOT EXISTS shoppingDate (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    totalPrice INTEGER DEFAULT 0,
    date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    )

    
}


export const insertDiary=async(form)=>{
    createTables()
        
        const db = await getDBConnection();
        db.runAsync(
            `INSERT INTO diary (diaryEntry,date) VALUES (?,?)`,
            [form.text,form.displayDate]
        )
}


export const insertJournal=async(form)=>{
  createTables()
        const db = await getDBConnection();
        db.runAsync(
            `INSERT INTO journal (journalEntry,date) VALUES (?,?)`,
            [form.text,form.displayDate]
        )
}

export const getDiary = async () => {
    const db = await getDBConnection();
    const result =await db.getAllAsync( `SELECT * FROM diary`);
    return result;
    
}

export const getJournal = async () => {
    const db = await getDBConnection();
    const result =await db.getAllAsync( `SELECT * FROM journal`);
    return result;
}




// READ (all goals)
export const getGoals = async () => {
  const db = await getDBConnection();
  const results = await db.getAllAsync(`SELECT * FROM goals`);
  console.log(results);
  
  return results

};


export const insertGoal = async ({ goal, duration, achieved }) => {
  createTables()
  const db = await getDBConnection();
  await db.runAsync(
    `INSERT INTO goals (goal, duration, achieved) VALUES (?, ?, ?)`,
    [goal, duration, achieved ? 1 : 0]
  );
};

export const updateGoal = async ({ id, goal, duration, achieved }) => {
  const db = await getDBConnection();
  await db.runAsync(
    `UPDATE goals SET goal=?, duration=?, achieved=? WHERE id=?`,
    [goal, duration, achieved ? 1 : 0, id]
  );
};

// DELETE
export const deleteGoal = async (id) => {
  const db = await getDBConnection();
  await db.runAsync(`DELETE FROM goals WHERE id=${id}`);
};

// CREATE


export const insertShoppingList = async (form) => {
  createTables()
 const db = await getDBConnection()
  await db.execAsync(`
    INSERT INTO shoppingDate (totalPrice) VALUES (?)
    `,[form.price*form.quantity])
  
    const id = await db.getAllAsync(`SELECT id FROM shoppingDate`)
    console.log(id,'l');
    
    
 await db.runAsync(`INSERT INTO shopping(item,quantity,price,itemId) VALUES (?,?,?,?)`,[form.name,form.quantity,form.price,id.at(-1).id])

};

export const getShopping = async(date)=>{
  const db = await getDBConnection();
  const res = await db.getAllAsync(
    `SELECT * FROM shopping`
  )
  
  return res
}

export const getShoppingDates = async(date)=>{
  const db = await getDBConnection();
  const res = await db.getAllAsync(
    `SELECT * FROM shoppingDate  `,
  )
  
return res  
}
export const addShopping =async (form) => {
  const db = await getDBConnection()
  const id = await db.getAllAsync(`SELECT id FROM shoppingDate WHERE date = ?`,[form.date])
  
 db.runAsync(`INSERT INTO shopping (item,quantity,price,itemId) VALUES(?,?,?,?)`,[form.name,form.quantity,form.price,id[0].id])
  
}

export const updateShopping =async (form) => {
  const db = await getDBConnection();
  
 db.runAsync(`UPDATE shopping SET  item=? ,quantity=? ,price=? WHERE id=?`,[form.name,form.quantity,form.price,form.id])
}
const dropTables=async()=>{
  const db = getDBConnection();
    await db.runSync('DROP TABLE IF EXISTS shoppingDate')
}
//dropTables()
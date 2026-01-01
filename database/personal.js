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
        `CREATE TABLE IF NOT EXISTS Journal(
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

}


export const insertDiary=async(form)=>{
        
        const db = await getDBConnection();
        db.runAsync(
            `INSERT INTO diary (diaryEntry,date) VALUES (?,?)`,
            [form.text,form.displayDate]
        )
}


export const insertJournal=async(form)=>{
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


// CREATE
export const insertGoal = async (form) => {
    const {goal,duration,achieved} = form
    console.log(goal,duration);
    
  const db = await getDBConnection();
  await db.execAsync(`
    INSERT INTO goals (goal, duration, achieved)
    VALUES ('${goal}', '${duration}', ${achieved ? 1 : 0})
  `);
};

// READ (all goals)
export const getGoals = async () => {
  const db = await getDBConnection();
  const results = await db.getAllAsync(`SELECT * FROM goals`);
  console.log(results);
  
  return results

};



// UPDATE
export const updateGoal = async (form) => {
const {id,goal,duration,achieved}=form
console.log(id,goal,duration,achieved);

  const db = await getDBConnection();
  await db.runAsync(`
    UPDATE goals
    SET goal='${goal}', duration='${duration}', achieved=${achieved ? 1 : 0}
    WHERE id=${id}
  `);
};

// DELETE
export const deleteGoal = async (id) => {
  const db = await getDBConnection();
  await db.runAsync(`DELETE FROM goals WHERE id=${id}`);
};
getGoals()
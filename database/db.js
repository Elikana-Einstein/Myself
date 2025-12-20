import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('einstein.db');

export const getDBConnection = async () => db;

export const initDB = async () => {
    
  const db = await getDBConnection();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS todayTask (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT,
      status TEXT,
      time TEXT
    );
  `);

};
///initDB();
export const insertTodo = async (form) => {
  const db = await getDBConnection();
  

  await db.runAsync(
    `INSERT INTO todayTask (title, description,priority,status, time) VALUES (?, ?, ?,?,?)`,
    [form.title, form.description,form.priority,form.status, form.time,]
  );

};

export const getTodos = async () => {
  const db = await getDBConnection();
  const result = await db.getAllAsync(`SELECT * FROM todayTask `);
  
  return result;
  
};

export const editTodos= async (form) => {
  try {
    const db = await getDBConnection();
    await db.runAsync(
      'UPDATE todayTask SET title=?,description =?,priority=?,status=?,time=? WHERE id=?',
      [form.title,form.description,form.priority,form.status,form.time,form.id]
    )    
  } catch (error) {
    console.log(error);
    
  }
}
export const deleteTodos=async(id)=>{
  try {
    const db = await getDBConnection();
    db.runAsync(
      'DELETE FROM todayTask WHERE id=?',
      [id]
    )
  } catch (error) {
    console.log(error);
    
  }
}




export const insertDay = async (day,form) => {

  const db = await getDBConnection();
   await db.execAsync(
    `CREATE TABLE IF NOT EXISTS ${day}(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time TEXT,
      event  TEXT,
      venue  TEXT
  )`
  );

    await db.runAsync(
      `INSERT INTO ${day} (time, event , venue) VALUES(?,?,?)`,
      [form.time,form.event,form.venue]
    )
  
}

export const getDays=async (day) => {
  const db = await getDBConnection();
    const result = await db.getAllAsync(`SELECT * FROM ${day}`);
    return result
}
export const updateDay = async (day,form) => {
  const db = await getDBConnection();
  await db.runAsync(
    `UPDATE ${day} SET time=?,event=?,venue=? WHERE id=?`,
    [form.time,form.event,form.venue,form.id]
  )
}

export const createEvent=async(form)=>{
  const db =await getDBConnection();

  await db.execAsync(
  `CREATE TABLE IF NOT EXISTS eventDate(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT
    )`
  )

  await db.execAsync(
    `CREATE TABLE IF NOT EXISTS event(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      eventName TEXT,
      venue TEXT,
      time TEXT,
      dateId INTEGER,
      FOREIGN KEY (dateId) REFERENCES eventDate(id)

    )`
  )

  await db.runAsync(
    `INSERT INTO eventDate (date) VALUES(?)`,
    [form.date]
  )
  await db.runAsync(
    `INSERT INTO event (eventName,venue,time,dateId) VALUES(?,?,?,(SELECT id FROM eventDate WHERE date=?))`,
    [form.eventName,form.venue,form.time,form.date]
  )


}

export const getEvents=async(date)=>{
  const db = await getDBConnection();
 const result = await db.getAllAsync(
    `SELECT eventName, venue, time FROM event WHERE dateId=(SELECT id FROM eventDate WHERE date=?)`,
    [date]
);
return result;
}

export const getEventDates = async () => {
  const db = await getDBConnection();
  const result = await db.getAllAsync(
    `SELECT date FROM eventDate`
  );
  
  return result;
};
/*
const dropTables=async()=>{
  const db = getDBConnection();
    (await db).runSync('DROP TABLE IF EXISTS todayTask')

}
//dropTables()*/
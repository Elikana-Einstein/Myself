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

}


export const insertDiary=async(form)=>{
    
        const db = await getDBConnection();
        db.runAsync(
            `INSERT INTO diary (diaryEntry,date) VALUES (?,?)`,
            [form.entry,form.date]
        )
}

export const getDiary = async () => {
    const db = await getDBConnection();
    const result =await db.getAllAsync( `SELECT * FROM diary`);
    return result;
    
}


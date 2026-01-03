import { getDBConnection } from "./db.js";

export const createTransactionDb = async () => {
  const db = await getDBConnection();
  await db.execAsync(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    TransactionType TEXT NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    date TEXT NOT NULL
  );`);
}
createTransactionDb()

export const insertTransaction = async (transaction) => {
    console.log(transaction);
    
  const db = await getDBConnection();
  const { type, amount, description, date } = transaction;
  await db.runAsync (
    `INSERT INTO transactions (TransactionType, amount, description, date) VALUES (?, ?, ?, ?)`,
    [type, amount, description, date]
  );
}

export const getAllTransactions = async () => {
  const db = await getDBConnection();
  const results = await db.getAllAsync(`SELECT * FROM transactions`);
  
return results;
}

export const createIvestmentPlatformsTable = async (form) => {
  const db = await getDBConnection();


   db.execAsync(
    `CREATE TABLE IF NOT EXISTS platforms(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT  UNIQUE,
      target_amount NUMBER,
      duration NUMBER,
      balance NUMBER

    )`
  )

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS investment(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount NUMBER,
      date DATE,
      platformId NUMBER,
      FOREIGN KEY (platformId) REFERENCES platforms(id) ON DELETE CASCADE
    )`
  )
}
createIvestmentPlatformsTable()
export const insertPlatform = async (form) => {
  const db = await getDBConnection();
  createIvestmentPlatformsTable()

    await db.runAsync(
    `INSERT INTO platforms (name, target_amount, duration, balance) VALUES (?, ?, ?, ?)`,
   [  form.platformName , form.targetAmount, form.duration, 0]
);

}

export const insertInvestment=async (form) => {
    const db = await getDBConnection();
    createIvestmentPlatformsTable()
    await db.runAsync(
      `INSERT INTO investment (amount, date, platformId) VALUES (?, ?, (SELECT id FROM platforms WHERE name = ? ))`,
      [form.amount, form.date, form.platformName]
    )

    await db.runAsync(
      `UPDATE platforms SET balance = balance + ? WHERE name = ?`,
      [form.amount, form.platformName]
    )

}

export const getAllPlatforms = async () => {
  const db = await getDBConnection();
  const results = await db.getAllAsync(`SELECT * FROM platforms`);  
  return results;
}

export const getAllInvestments = async () => {
  const db = await getDBConnection();
  const results = await db.getAllAsync(
    `SELECT 
      investment.amount, 
      investment.date, 
      platforms.name as platformName
     FROM investment 
     JOIN platforms ON investment.platformId = platforms.id`
  ); 
  return results;
}




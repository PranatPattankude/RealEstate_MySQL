import mysql from 'mysql';

import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if (error) {
        console.log("MySQL failed to connect:", error);
    } else {
        console.log("MySQL connected successfully");
    }
});

export default db;

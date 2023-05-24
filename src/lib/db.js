import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db; 

let getDb = async () => {
    if (!db) {
        db = await open({
            filename: `${process.cwd()}/db/main.db`,
            driver: sqlite3.Database
        });
        await db.run('CREATE TABLE IF NOT EXISTS events (name TEXT, desc TEXT, start TEXT, end TEXT)')
    } 
    return db;
};

export {
    getDb
};
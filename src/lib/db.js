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
        await db.run('CREATE TABLE IF NOT EXISTS categories (event TEXT, category TEXT)')
        await db.run('CREATE TABLE IF NOT EXISTS auth (username TEXT, password TEXT)')
        await db.run('CREATE TABLE IF NOT EXISTS token (username TEXT, token TEXT)')
    } 
    return db;
};

export {
    getDb
};
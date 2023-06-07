import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

let db; 

let getDb = async () => {
    if (!db) {
        db = await open({
            filename: `${process.cwd()}/db/main.db`,
            driver: sqlite3.Database
        });
        await db.run('CREATE TABLE IF NOT EXISTS events (name TEXT, desc TEXT, start TEXT, end TEXT, user TEXT)')
        await db.run('CREATE TABLE IF NOT EXISTS categories (event TEXT, category TEXT)')
        await db.run('CREATE TABLE IF NOT EXISTS auth (username TEXT, password TEXT)')
        await db.run('CREATE TABLE IF NOT EXISTS token (username TEXT, token TEXT)')
    } 
    return db;
};

let returnSuccess = (data) => {
    return new Response(JSON.stringify({'success': data}));
}

let getToken = async (cookies, fetch) => {
    const token = cookies.get('token');

    let username;
    if (!token) {
        username = '???'
    } else {
        username = await fetch('https://auth.montidg.net/api/account/token/', {
            'method': 'POST',
            'headers': {
                "Content-Type": "application/json",
            },
            'body': JSON.stringify({
                token: token,
                scope: 'linetime'
            })
        }).then(x => x.json());
        username = username.data[0].username;
    }

    return username;
}

export {
    getDb,
    returnSuccess,
    getToken
};
import { getDb, returnSuccess } from '$lib/db.js';
import { hash } from 'bcrypt'
let db;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const data = await request.json();
    db = await getDb();

    if (!data || !data.username || !data.password || !data.password2) return returnSuccess('Data not found.');

    let {username, password, password2} = data;

    if (password != password2) return returnSuccess('Passwords don\'t match.');

    var existingAccounts = await db.all('SELECT username FROM auth WHERE UPPER(username) LIKE UPPER(?)',[
        username
    ]);

    if (existingAccounts && existingAccounts.length > 0)
        return returnSuccess('Account already exists.');

    var passHash = await hash(password,10);

    await db.run('INSERT INTO auth (username, password) VALUES (?, ?)', [
        username,
        passHash
    ])

    await db.run('INSERT INTO auth (username) VALUES (?)', [
        username
    ])

    return returnSuccess('Account successfully created.');
};
import { getDb, returnSuccess } from '$lib/db.js';
import { compare } from 'bcrypt'
import { randomBytes } from 'node:crypto';
let db;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies }) {
    const data = await request.json();
    db = await getDb();

    if (!data || !data.username || !data.password) return returnSuccess('Data not found.');

    let {username, password} = data;

    var existingAccounts = await db.all('SELECT username, password FROM auth WHERE username = ?',[
        username
    ]);

    if (!existingAccounts || existingAccounts.length < 1)
        return returnSuccess('Invalid username.');

    var passHash = await compare(password,existingAccounts[0].password);

    if (!passHash) 
        return returnSuccess('Incorrect password');

    var token = randomBytes(256).toString('hex');

    await db.run('INSERT INTO token (username, token) VALUES (?, ?)', [
        username,
        token
    ])

    if (token) {
        cookies.set('token',token, {
          maxAge: 60 * 60 * 24 * 7,
          path: '/'
        });
    };

    return returnSuccess('Successfully logged in.');
};
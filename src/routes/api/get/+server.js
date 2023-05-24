import { getDb } from '$lib/db.js';
let db

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
    db = await getDb();
    let data = await db.all('SELECT * FROM events');

    return new Response(JSON.stringify(data));
};
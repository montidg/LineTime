import { getDb } from '$lib/db.js';
let db = await getDb();

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
    let data = await db.all('SELECT * FROM events');

    return new Response(JSON.stringify(data));
};
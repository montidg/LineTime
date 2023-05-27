import { getDb } from '$lib/db.js';
let db;

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const input = url.searchParams.get('q');

    db = await getDb();
    let data = await db.get('SELECT * FROM events WHERE name = ?', [
        input
    ]) || {};

    let cat = (await db.all('SELECT event FROM categories WHERE event = ?', [
        input
    ]) || [])

    data.categories = cat.map(s => s.event).join(',');
   
    return new Response(JSON.stringify(data));
};
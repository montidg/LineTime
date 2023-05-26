import { getDb } from '$lib/db.js';
let db

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
    const input = url.searchParams.get('q');

    let categoryList = (input + '').split(',');

    db = await getDb();

    let data = [];

    if (categoryList.length != 0 && categoryList[0] != '' && categoryList[0] != 'null'  && categoryList[0] != 'undefined') {
        for (let i = 0; i < categoryList.length; i++) {
            let elems = await db.all('SELECT * FROM events WHERE name IN (SELECT event FROM categories WHERE category = ?)', [
                categoryList[i]
            ])
            data = [...data, ...elems];
        };
        data = [...new Set(data)];
    } else {
        data = await db.all('SELECT * FROM events');
    }
   

    return new Response(JSON.stringify(data));
};
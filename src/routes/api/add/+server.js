import { getDb } from '$lib/db.js';
let db;

let returnSuccess = (data) => {
    return new Response(JSON.stringify({'success': data}));
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    db = await getDb();
    const data = await request.json();

    if (!data || !data.start || !data.name || !data.end) return returnSuccess('Data not found.');

    let dateStart = new Date(data.start) * 1;
    let dateEnd = new Date(data.end) * 1;

    if (isNaN(dateEnd) || isNaN(dateStart)) return returnSuccess('Dates are invalid.');
    if (dateEnd <= dateStart) return returnSuccess('Dates are in the incorrect order.')

    await db.run('INSERT INTO events (name, start, end) VALUES (?, ?, ?)', [
        data.name + '',
        dateStart + '',
        dateEnd + ''
    ])

    return returnSuccess('next');
};
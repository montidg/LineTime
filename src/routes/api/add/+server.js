import { getDb, returnSuccess } from '$lib/db.js';
let db;

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    db = await getDb();
    const data = await request.json();

    if (!data || !data.start || !data.name || !data.end || !data.desc) return returnSuccess('Data not found.');

    let dateStart = new Date(data.start) * 1;
    let dateEnd = new Date(data.end) * 1;

    if (isNaN(dateEnd) || isNaN(dateStart)) return returnSuccess('Dates are invalid.');
    if (dateEnd <= dateStart) return returnSuccess('Dates are in the incorrect order.')

    let exists = await db.all('SELECT * FROM events WHERE name = ?', [
        data.name + ''
    ])

    if (exists && exists.length > 0) return returnSuccess('Event already exists.')

    await db.run('INSERT INTO events (name, start, end, desc) VALUES (?, ?, ?, ?)', [
        data.name + '',
        dateStart + '',
        dateEnd + '',
        data.desc + ''
    ])

    if (data.categories) {
        let categories = (data.categories + '').split(',');
        
        for (var i = 0; i < categories.length; i++) {
            await db.run('INSERT INTO categories (event, category) VALUES (?, ?)', [
                data.name + '',
                categories[i]
            ])
        }

    }

    return returnSuccess('next');
};
import { getDb, returnSuccess } from '$lib/db.js';
let db;

let toDate = (date) => {
    const bcRegex = /([^\s]+)\sBC/i;
    
    let matches = date.match(bcRegex);

    if (matches && matches.length > 0) {
        let dateAlt = date.replace(bcRegex,'2020');
        let outDate = new Date(dateAlt);

        outDate.setFullYear(matches[1] * -1);

        return outDate * 1;
    }

    console.log(date)

    return new Date(date) * 1;
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, cookies, fetch }) {
    db = await getDb();
    const data = await request.json();
    const token = cookies.get('token');

    if (!data || !data.start || !data.name || !data.end || !data.desc) return returnSuccess('Data not found.');

    if (data.name.length > 64) return returnSuccess('Name too long. Maximum is 64 characters.');

    let dateStart = toDate(data.start);
    let dateEnd = toDate(data.end);

    if (isNaN(dateEnd) || isNaN(dateStart)) return returnSuccess('Dates are invalid.');
    if (dateEnd <= dateStart) return returnSuccess('Dates are in the incorrect order.')

    let exists = await db.all('SELECT * FROM events WHERE name = ?', [
        data.name + ''
    ])

    if (exists && exists.length > 0) return returnSuccess('Event already exists.')

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

    await db.run('INSERT INTO events (name, start, end, desc, user) VALUES (?, ?, ?, ?, ?)', [
        data.name + '',
        dateStart + '',
        dateEnd + '',
        data.desc + '',
        username + ''
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
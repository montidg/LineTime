/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let res = await fetch(`/api/get`).then(x => x.json());
    return { res };
}
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let res = await fetch(`/api/get?q=${params.page + ''}`).then(x => x.json());
    return { res };
}
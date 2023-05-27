/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
    let res = await fetch(`/api/wiki?q=${params.page + ''}`).then(x => x.json());
    return { res };
}
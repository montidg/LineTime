/** @type {import('./$types').PageLoad} */
export async function load({ fetch}) {
    const res = await fetch(`/api/get`).then(x => x.json());

    console.log(res);

    return { res };
}
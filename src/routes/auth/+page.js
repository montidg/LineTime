import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies,url }) {
    let param = url.searchParams.get('data');
    cookies.set('token',param, { path: '/', maxAge: 60 * 60 * 24 * 7, secure: false, httpOnly: false });
    throw redirect(302, '/');
}
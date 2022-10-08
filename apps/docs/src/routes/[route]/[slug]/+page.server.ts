import preload from '../preload.json'
import { client } from '$lib/sanityClient'

/** @type {import('./$types').PageServerLoad} */
export async function load(F) {
	const post: { title: string; slug: { current: string } } =
		await client.fetch(/* groq */ `*[
			_type == "${F.params.route}" &&
			defined(slug.current) &&
			 slug.current == "${F.params.slug}"][0]{
			title,
			slug {
			  current
			},
			body,
			publishedAt
		  }`)

	if (post) {
		return {
			preload,
			post,
		}
	}
}

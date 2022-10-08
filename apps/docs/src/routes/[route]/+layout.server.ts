import preload from './preload.json'
import { client } from '$lib/sanityClient'

// Fetch all valid posts & authors to display in the homepage
export async function load(F) {
	console.log(F)
	const posts: [{ title: string; slug: { current: string } }] =
		await client.fetch(/* groq */ `*[_type=="${F.params.route}"] {
			title,
			slug {
			  current
			}
		  }`)

	if (posts) {
		return {
			page: F.params.route,
			preload,
			posts,
		}
	}
}

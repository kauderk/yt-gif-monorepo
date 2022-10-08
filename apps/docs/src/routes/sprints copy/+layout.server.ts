import preload from './preload.json'
import { client } from '$lib/sanityClient'

// Fetch all valid posts & authors to display in the homepage
export async function load({ params }) {
	const posts: [{ title: string; slug: { current: string } }] =
		await client.fetch(/* groq */ `*[_type=='sprint'] {
			title,
			slug {
			  current
			}
		  }`)

	if (posts) {
		return {
			preload,
			posts,
		}
	}
}

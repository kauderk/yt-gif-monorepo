import { getPostsQuery } from '$lib/queries'
import { client } from '$lib/sanityClient'

// Gets a specific author from its slug.current value
/** @type {import('./$types').PageServerLoad} */
export async function load({ slug }) {
	const author = await client.fetch(/* groq */ `*[
		_type == "author" &&
		defined(slug.current) &&
		 slug.current == "${slug}"][0]{
    ...,
		"posts": ${getPostsQuery(`
			// Get every post that includes the current document _id in its authors[]
			^._id in authors[].author._ref
		`)}
  }`)

	if (author) {
		return {
			author,
		}
	}

	throw new Error(
		'@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)'
	)
	return {
		status: 404,
	}
}

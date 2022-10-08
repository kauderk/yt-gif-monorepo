import {AUTHOR_CARD_FRAGMENT, getPostsQuery} from '$lib/queries'
import {client} from '$lib/sanityClient'

// Fetch all valid posts & authors to display in the homepage
export async function load() {
  const data = await client.fetch(/* groq */ `{
		"posts": ${getPostsQuery()},
		"authors": *[_type == "author" && defined(slug.current)] {
			${AUTHOR_CARD_FRAGMENT}
		}
  }`)

  if (data) {
    return data
  }

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292699)");
  return {
    status: 404
  }
}

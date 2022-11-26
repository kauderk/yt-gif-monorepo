import search from '../query'
import { API, querySpread } from 'sveltekit-zero-api'
import { Ok } from 'sveltekit-zero-api/http'
import { matchAll } from '$lib/regex/match'

interface TGet {
	query: { id: string }
}
export const GET = async (event: API<TGet>) => {
	const { id } = querySpread(event)

	const res = await search.GetVideoDetails(id)

	const rgx =
		/(?<time>\d{2}:\d{2}:\d{2}|\d{1,2}:\d{2})(?<chapterTitle>.+?(?=\n|\\n))/gm

	const match = matchAll<'time' | 'chapterTitle'>(res.description, rgx)

	return Ok({
		body: {
			match: match.length ? match! : null,
			chapters: match.length ? null : res.chapters!,
		},
	})
}

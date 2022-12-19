import { stealthQuery } from '$lib/api/svelte-query/client'
import { useQuery } from '@sveltestack/svelte-query'
import Api from 'src/api'

export const PlaceholderID = 'ZwLekxsSY3Y'
/*
How do you retrieve types from the endpoint?
function MakeGETQuery(key: keyof typeof Api.youtube) {
	const state = { query: { id: PlaceholderID } }
	const query = useQuery(
		key,
		// this will return any
		async () => Api.youtube[key].GET(state).$.Ok(o => o.body),
		stealthQuery
	)
	return { state, query }
}
*/

export const MakeGETQueries = () => ({
	search: (function () {
		const params = { query: { id: PlaceholderID } }
		const query = useQuery(
			'search',
			async () => Api.youtube.search.GET(params).$.Ok(o => o.body),
			stealthQuery
		)
		return { params, query }
	})(),
	chapters: (function () {
		const params = { query: { id: PlaceholderID } }
		const query = useQuery(
			'chapters',
			async () => Api.youtube.chapters.GET(params).$.Ok(o => o.body),
			stealthQuery
		)
		return { params, query }
	})(),
	transcript: (function () {
		const params = { query: { id: PlaceholderID } }
		const query = useQuery(
			'transcript',
			async () => Api.youtube.transcript.GET(params).$.Ok(o => o.body),
			stealthQuery
		)
		return { params, query }
	})(),
})

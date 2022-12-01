import search from '../query'
import { API, querySpread } from 'sveltekit-zero-api'
import { Ok } from 'sveltekit-zero-api/http'
import type { RequireAtLeastOne } from '$lib/types/utilities'

interface TGet {
	query: RequireAtLeastOne<{
		keyword: string
		id: string
		list: string
		channel: string
		suggestion: number
	}>
}
export const GET = async (event: API<TGet>) => {
	const { keyword, id, list, channel, suggestion } = querySpread(event)

	if (keyword) {
		return Ok({ body: await search.GetListByKeyword(keyword, true, 15) })
	}
	if (id) {
		return Ok({ body: await search.GetVideoDetails(id) })
	}
	if (channel) {
		return Ok({ body: await search.GetChannelById(channel) })
	}
	if (suggestion) {
		return Ok({ body: await search.GetSuggestData(suggestion) })
	}
	if (list) {
		return Ok({ body: await search.GetPlaylistData(list) })
	}
}

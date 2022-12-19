import search from '../query'
import { API, querySpread } from 'sveltekit-zero-api'
import { BadRequest, Ok } from 'sveltekit-zero-api/http'
import type { RequireAtLeastOne } from '$lib/types/utilities'

interface TGet {
	query: RequireAtLeastOne<{
		keyword: string
		id: string
	}>
}
export const GET = async (event: API<TGet>) => {
	const { keyword, id } = querySpread(event)

	if (keyword) {
		return Ok({ body: await search.GetListByKeyword(keyword, true, 15) })
	}

	if (id) {
		return Ok({ body: await search.GetListByKeyword(id) })
	}
}

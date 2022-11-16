import search from './youtube-api'
import type { RequestHandler } from '@sveltejs/kit'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url }) => {
	let res: any = null

	const keyword = url.searchParams.get('keyword')
	if (keyword) res = await search.GetListByKeyword(keyword, true, 15)

	const id = url.searchParams.get('id')
	if (id) res = await search.GetListByKeyword(id)

	return json(res)
}

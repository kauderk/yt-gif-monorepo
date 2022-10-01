import { paramRgx } from '../../../../lib/utils'
import { getLastAnchorCmptInHierarchy } from '../../../../lib/backend-frontend/xxx-congif'
import type { o } from './types'

// to url, yt-gif
export function TryToReorderTmParams(p: s, url: s) {
	const t = 'start|t' // this is annoying...
	p = p ?? t
	p = p.includes('t') ? t : 'end'

	const o = p.includes('t') ? 'end' : t
	const wrongOrderRegex = new RegExp(
		`(${paramRgx(o).source})(.*&)(${paramRgx(p).source})`
	)

	if (wrongOrderRegex.test(url)) url = url.replace(wrongOrderRegex, '$6$5$1')
	return url
}
export async function TryToAssertHierarchyUrl({ uid }: o) {
	const { foundBlock } = await getLastAnchorCmptInHierarchy(uid, false)
	if (!foundBlock?.lastUrl) return ''

	return foundBlock.lastUrl
}

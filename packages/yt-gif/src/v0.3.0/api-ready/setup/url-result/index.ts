import { YTGIF_Config } from '$v3/lib/types/config'
import { GetUidResultObj } from './query'
import { Flow } from './flow'

export async function URLResults(el: El) {
	const { key, uidResults } = GetUidResultObj(el)

	if (!key) {
		return <typeof resObj>{}
	}

	const resObj = await Flow(uidResults, key)

	if (!YTGIF_Config.guardClause(resObj?.url)) {
		resObj.url = ''
	}

	return resObj
}

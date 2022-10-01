import { YTGIF_Config, Anchor_Config, anchorInstanceMap } from '../types/config'
import {
	getBlockParentUids_custom,
	getBlockStringByUID,
} from '$lib/utils-roam-alpha-api'
import type { ILastUrlObj, Trm_block } from './types'
import {
	getMap_smart,
	getComponentMap,
	getUrlMap_smart,
	clean_rm_string,
} from './get-maps'
import { AssembleFilterObjs, getYTGIFparams } from './components'

//#region  backend/frontend communication - XXX_Config = {...}

export async function getLastAnchorCmptInHierarchy(
	tempUID: string,
	includeOrigin = true
) {
	// the anchor workflow is to find itself and any valid urls in the process
	const filterUrlObj = AssembleFilterObjs()
	const { blockStrings, originBlockObj } = await getParentsHierarchy(
		tempUID,
		includeOrigin
	)

	for (let blockObj of blockStrings?.reverse()) {
		const componentMap = await getMap_smart(
			blockObj.uid,
			anchorInstanceMap,
			getComponentMap,
			// rest
			blockObj.uid,
			Anchor_Config
		)
		const reverseEntries = [...componentMap.entries()].reverse()
		const lastUrlObj = await findLastAnchorObj(reverseEntries, componentMap) // this right here

		if (!lastUrlObj || !lastUrlObj.match) continue

		if (lastUrlObj.from == 'yt-gif')
			blockObj = Object.assign(blockObj, lastUrlObj.ObjAsKey)
		// blockObj.anchor: { ...blockObj }, seems like this is not needed
		return getYTGIFparams(
			blockObj,
			lastUrlObj,
			filterUrlObj,
			originBlockObj
		)
	}
	return <ReturnType<typeof getYTGIFparams>>{ ok: false }
}
async function findLastAnchorObj(
	reverseEntries: Trm_map_entry[],
	map: Trm_map
) {
	const resObj = (str: string, entry: Trm_map_entry) =>
		<const>{
			match: str,
			index: reverseEntries.indexOf(entry),
			componentMap: map,
			from: 'anchor',
			ObjAsKey: <TObjAsKey>{},
		}

	for (const entry of reverseEntries) {
		const [obj, str] = entry as [TObjAsKey, string]
		// str could be either an xxxuidxxx or an url, bc Anchor_Config pages are those... 'yt-gif' or 'yt-gif/anchor'
		const match = obj?.capture
			? [...obj?.capture.matchAll(Anchor_Config.componentRgx)][0]
			: []
		const page = match?.[2]
		const content = match?.[5]

		if (page == 'yt-gif' && YTGIF_Config.guardClause(str))
			// it is an url
			return resObj(str, entry)
		if (page != 'yt-gif/anchor' || !content)
			// is not an anchor
			continue
		if (YTGIF_Config.guardClause(str))
			// it is an url inside an anchor
			return resObj(str, entry)
		if (!str || str.length != 9)
			// is it a valid uid?
			continue

		return getLastUrlObjInMap(str)
	}
	return null
}
async function getLastUrlObjInMap(uid: string): Promise<ILastUrlObj> {
	const componentMap = await getUrlMap_smart(uid)
	const reverseValues = [...componentMap.values()].reverse()
	const match = reverseValues.find(str => YTGIF_Config.guardClause(str))
	const index = reverseValues.indexOf(match!) // I expect the posibility of -1 the Non-null assertion operator makes that possible?

	return (<const>{
		match,
		index,
		componentMap,
		from: 'yt-gif',
		ObjAsKey: [...componentMap.keys()].reverse()[index],
		// FIXME: This will break, 100% sure
	}) as ILastUrlObj
}
async function getParentsHierarchy(
	tempUID: string,
	includeOrigin: boolean
): Promise<{ originBlockObj: Trm_block; blockStrings: Trm_block[] }> {
	const ParentHierarchy = await getBlockParentUids_custom(tempUID)
	// if (!ParentHierarchy) {
	// 	return null // turns out the function had a try/catch, so this is not needed
	// 	//throw new Error('no parent hierarchy')
	// }
	let Hierarchy: typeof ParentHierarchy,
		originalStr = ''

	if (!includeOrigin) {
		Hierarchy = ParentHierarchy
	} else {
		originalStr = (await getBlockStringByUID(tempUID)) || ''
		Hierarchy = [
			...ParentHierarchy,
			[
				{ uid: tempUID, string: originalStr },
				{ title: 'made-up', uid: 'invalid' },
			],
		]
	}

	return <const>{
		blockStrings: Hierarchy.map(arr => arr[0]).map(o => ({
			string: clean_rm_string(o.string),
			uid: o.uid,
		})),
		originBlockObj: {
			string: originalStr,
			uid: tempUID,
		},
	}
}

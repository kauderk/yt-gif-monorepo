import type { ICongif } from '../types/config'
import {
	YTGIF_Config,
	Anchor_Config,
	anchorInstanceMap,
	UIDtoURLInstancesMapMap,
} from '../types/config'
import { getBlockStringByUID } from '$lib/utils-roam-alpha-api'
import { pushSame } from '$lib/utils'
import { preRgxComp, BlockRegexObj } from '../utils'

export async function getAnchor_smart(uid: string) {
	return getMap_smart(
		uid,
		anchorInstanceMap,
		getComponentMap,
		uid,
		Anchor_Config
	)
}
export async function getUrlMap_smart(uid: string) {
	return getMap_smart(
		uid,
		UIDtoURLInstancesMapMap,
		getComponentMap,
		uid,
		YTGIF_Config
	)
}
export async function getMap_smart<V = Trm_map>(
	key: string,
	map: Map<string | TObjAsKey, unknown>,
	callback: Function,
	...setMapCb_params: Array<unknown>
) {
	// https://stackoverflow.com/questions/3458553/javascript-passing-parameters-to-a-callback-function#:~:text=console.log(param1)%3B%0A%7D-,function%20callbackTester(callback%2C%20...params)%20%7B,-callback(...params)%3B%0A%7D%0A%0A%0A%0AcallbackTester
	// since it store recursive maps, once per instance it's enough
	// try {
	if (!key)
		throw new Error('invalid uid|key while trying to call getComponentMap')
	if (!map.has(key)) map.set(key, await callback(...setMapCb_params))
	//@ts-ignore
	return map.get(key) as V
	// } catch (error) {
	// 	console.log(error)
	// FIXME?
	// 	return null // If there's and error The entire app should sotp either way... so we can't return null
	// }
}
export async function getComponentMap(tempUID: string, _Config: ICongif) {
	let uidMagazine = Array<string>()
	let indentFunc = 0
	const { componentPage, targetStringRgx, scatteredMatch } = _Config

	class TOrder {
		order = -1
		incrementIf: (x: unknown) => n | null = (condition: unknown) => {
			return condition ? Number(++this.order) : null
		}
		condition = (x: unknown) => false
	}
	//TODO:
	type position = {
		is: isKey
		order: number
		capture: StrSearch
	}
	type rmObj = position & {
		value: string
		targetStringsWithUids?: Array<rmResObj>
	}
	type rmResObj = rmObj | rmResObj[]
	class IResults {
		'is tooltip card' = new TOrder()
		'is substring' = new TOrder()
		'is component' = new TOrder()
		'is alias' = new TOrder()
		'is block reference' = new TOrder()
	}
	class IStringWithUIDs {
		targetStringsWithUids = Array<rmResObj>()
		blockReferencesAlone = Array<string>()
		uid: string = ''
		uidHierarchy = Array<string>()
		isKey?: isKey
	}

	// create results from Iresults
	const results = new IResults()

	//Object.keys(results).forEach(key => Object.assign(results[key], orderObj))
	// componentsInOrderMap
	return TryToFindTargetStrings_Rec(
		await TryToFindTargetString(tempUID),
		new IStringWithUIDs(),
		new Map()
	)

	async function TryToFindTargetStrings_Rec(
		objRes: IStringWithUIDs,
		parentObj: IStringWithUIDs,
		map: Trm_map
	) {
		for (const matchObj of objRes?.targetStringsWithUids) {
			// loop through RENDERED targetStrings (components) and uids (references)
			const { value, is } = matchObj as rmObj
			const generateUniqueKey = (): TObjAsKey =>
				assertUniqueKey_while(
					objRes.uid,
					indentFunc,
					matchObj as position
				)

			if (
				['is alias', 'is component', 'is substring'].some(w => w === is)
			) {
				map.set(generateUniqueKey(), value)
			} else if (is === 'is tooltip card') {
				const { tooltipKey, tooltipObj } = generateTooltipObj(
					value,
					objRes,
					generateUniqueKey
				) // save it a spot in the map
				const tooltipMap = await TryToFindTargetStrings_Rec(
					tooltipObj,
					parentObj,
					new Map()
				)
				map.set(tooltipKey, tooltipMap) // assign it
			} else if (is == 'is block reference') {
				parentObj.uidHierarchy = pushSame(parentObj.uidHierarchy, value)

				const comesFromRecursiveParent = parentObj?.uid == value
				const isSelfRecursive =
					parentObj?.blockReferencesAlone?.includes(value) ||
					value == tempUID
				const pastFirstLevel =
					indentFunc > parentObj?.uidHierarchy?.length ?? 1
				if (
					comesFromRecursiveParent ||
					(pastFirstLevel && isSelfRecursive)
				)
					continue // skip it | unrendered

				// it is rendered, so execute it's rec func
				indentFunc += 1
				objRes.isKey = is
				map = await TryToFindTargetStrings_Rec(
					await TryToFindTargetString(value),
					objRes,
					map
				)
				indentFunc -= 1
			}
		}

		return map

		function assertUniqueKey_while(
			uid: string,
			indent: number,
			{ is, order, capture }: position
		): TObjAsKey {
			uidMagazine = PushIfNewEntry(uidMagazine, uid) // clunky, but it works

			const similarCount = uidMagazine.filter(x => x === uid).length // uniqueKey among non siblings
			return <const>{
				indent,
				uid,
				similarCount,
				isKey: is,
				isKeyOrder: isCount(),
				order,
				capture: capture as string,
			}

			function isCount() {
				for (const [_is, _val] of Object.entries(results))
					_val.incrementIf(_is === is)

				return results[is].order
			}
		}
		function PushIfNewEntry<T>(arr: Array<T>, item: T) {
			const lastItem = [...arr]?.pop()
			if (lastItem != item) arr = pushSame(arr, item)
			return arr
		}
	}

	function generateTooltipObj(
		value: string,
		objRes: IStringWithUIDs,
		generateUniqueKey: Function
	) {
		const tooltipObj = stringsWihtUidsObj(value)

		tooltipObj.uid =
			objRes.uid +
			'_t' +
			(results['is tooltip card'].order < 0
				? 0
				: results['is tooltip card'].order)

		const tooltipKey: string = generateUniqueKey()
		return <const>{ tooltipKey, tooltipObj }
	}

	async function TryToFindTargetString(desiredUID: string) {
		const rawText = await getBlockStringByUID(desiredUID)
		const resObj = stringsWihtUidsObj(rawText)
		resObj.uid = desiredUID
		resObj.uidHierarchy = resObj.uidHierarchy ?? []
		return resObj
	}

	function stringsWihtUidsObj(rawText: string): IStringWithUIDs {
		const { blockRgx, aliasPlusUidsRgx, tooltipCardRgx, componentRgx } =
			BlockRegexObj(componentPage, targetStringRgx)

		const string = clean_rm_string(rawText)

		let blockRefsOnly: string[] = [] // ACC inside getRenderedStuff()

		const compactObjs = getRenderedStuff(string)
		// @ts-ignore Type instantiation is excessively deep and possibly infinite.ts(2539)
		// prettier-ignore
		const targetStringsWithUids: rmResObj[] = compactObjs.flat(Infinity).filter(x => x != null);

		return <const>{
			...(<IStringWithUIDs>{}),
			targetStringsWithUids,
			blockReferencesAlone: blockRefsOnly,
		}

		function getRenderedStuff(string: string) {
			const blockMatches = [
				...[...string.matchAll(new RegExp(blockRgx, 'gm'))].map(
					// @ts-ignore
					x => (x = x[0])
				),
			]
			const siblingsOrderObj = new IResults()

			return blockMatches.map(val => isValueObj(val, siblingsOrderObj))

			function isValueObj(
				val: string,
				siblingsOrder: IResults
			): rmResObj {
				function resObj(): rmResObj {
					siblingsOrder[is].incrementIf(true)
					return <const>{
						value: inOrderValue as string,
						is,
						order: siblingsOrder[is].order,
						capture: rgxMatch as string,
					}
				}
				const match = (rgx: RegExp) => val.match(rgx)?.[0]
				const matchAll = (rgx: RegExp) => [...val.matchAll(rgx)][0]

				let is: isKey = 'is block reference',
					inOrderValue: StrSearch = val,
					rgxMatch: StrSearch // because we're assigning and checking within the if statements

				if ((rgxMatch = match(tooltipCardRgx))) {
					// {{=:_rendered_by_roam_| -> string XXxxxx ... <- }}
					is = 'is tooltip card'
					inOrderValue = matchAll(tooltipCardRgx)[2]

					const blockLikeString = matchAll(tooltipCardRgx)[1]
					return [resObj(), ...getRenderedStuff(blockLikeString)]
				} else if ((rgxMatch = match(aliasPlusUidsRgx))) {
					// [xxxanything goesxxx]((( -> xxxuidxxx <- )))
					is = 'is alias'
					inOrderValue = matchAll(aliasPlusUidsRgx)[2]
				} else if (
					scatteredMatch &&
					(rgxMatch = match(targetStringRgx)) &&
					!match(componentRgx)
				) {
					//  -> ... .... ..... -> subStrings in the wild XXxxxx ... <-
					is = 'is substring'
					inOrderValue = match(targetStringRgx)
				} else if (
					!scatteredMatch &&
					(rgxMatch = match(componentRgx))
				) {
					// {{componentPage: -> first target <- xxxxxx xxx... }}
					is = 'is component'
					inOrderValue = match(targetStringRgx)
				} // xxxuidxxx
				else {
					if (inOrderValue.length != 9)
						return null! // @ts-ignore Should be able to return null here, because we're filtering out nulls
					else blockRefsOnly = pushSame(blockRefsOnly, val)
				}

				return resObj()
			}
		}
	}
}
export function clean_rm_string(rawText: string) {
	const s1 = rawText.replace(
		/(`.+?`)|(`([\s\S]*?)`)/gm,
		'used_to_be_an_inline_code_block'
	)
	return s1.replace(
		new RegExp(preRgxComp('embed'), 'gm'),
		'used_to_be_an_embed_block'
	)
}

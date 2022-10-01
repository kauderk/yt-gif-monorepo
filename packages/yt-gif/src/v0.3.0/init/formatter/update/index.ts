import { indexPairObj } from '../query/regex'
import {
	TryRecycle,
	GetBadMatches,
	GetPossibleMatches,
	rightMatch,
	TryGetStartEnd,
} from './query'

export async function TryToUpdateBlockSubString(
	tempUid: s,
	replaceIndex: n,
	toReplace: s,
	recycledRequest: TBlockInfo[][] | null
) {
	const { info, blockReq } = await TryRecycle(recycledRequest, tempUid)

	if (!info || replaceIndex == -1) {
		return { ...(<typeof res>{}), success: false, open: false }
	}

	const index = (rgx: RegExp, type: s) => indexPairObj(rgx, info.string, type)

	// 1. gather spots/boundaries where roam does NOT render information
	const bad = GetBadMatches(index, toReplace)

	// 2. valid spots where you can insert fmt components - user requests
	const possible = GetPossibleMatches(index, toReplace)
	const valid = possible.filter(good => rightMatch(bad, good))

	// NICE!
	const res = <const>{
		success: true,
		uid: tempUid,
		...TryGetStartEnd(valid, replaceIndex),
		open: info.open,
		string: info.string,
		recycledRequest: blockReq,
	}
	return res
}

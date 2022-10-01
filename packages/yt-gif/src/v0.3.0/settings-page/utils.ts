import { moveBlock } from '$lib/utils-roam-alpha-api'
import type { T_SettingsAny, TProperty } from './types'

/* 🚙 🚙 🚙*/
// prettier-ignore

export function AssignExamineProperty<T extends T_SettingsAny>(baseKeyObj: T, string: s, uid: s) {
	return Object.assign(baseKeyObj, {
		examined: true,
		uid: uid,
		string,
	}) as typeof baseKeyObj;
}
export async function checkReorderBlockObj(
	parentUid: s,
	selfOrder: n,
	childObjToMoveUID: TProperty
) {
	const validOrder = childObjToMoveUID.order
	const validUid = childObjToMoveUID.uid
	try {
		if (parentUid == validUid) {
			throw new Error(
				`STOP! Don't move block to itself =>         ${parentUid} ${childObjToMoveUID.string}`
			)
		}
		if (selfOrder != validOrder) {
			debugger
			await moveBlock(parentUid, validOrder, validUid)
		}
	} catch (err) {
		debugger
	}
}

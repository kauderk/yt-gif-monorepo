import type { PAGE_TYPE } from './shape'
import { createBlock, createUid } from '$lib/utils-roam-alpha-api'
import type { TProperty, TDomProperty } from './types';
import { fmtSplit, cptrPrfx, cptrSufx } from './types'
import { TARGET_UID } from './keys'
import { checkReorderBlockObj, AssignExamineProperty } from './utils'
Array.prototype.Last = function () {
	return this[this.length - 1]
}

class IBaseAcc {
	accStr: string = ''
	nextStr: string = ''
	accKeys: string[] = []
	accHierarchyUids: string[] = []
	parentKey: string = '' // IRecursiveAcc
	tab: string = ''
	appenAccStr: () => string = appenAccStr
}
interface IManualStt {
	m_uid: string
	m_strArr: Array<string>
	m_order: number
	m_join?: string
}

export async function CreateMissingBLocks(page: PAGE_TYPE) {
	// 0.
	const ACC_OBJ = new IBaseAcc()

	// 1.
	return await Rec_CreateMissingBLocks(page, ACC_OBJ)
}
async function Rec_CreateMissingBLocks(nextObj: any, accObj: IBaseAcc) {
	let { accStr } = accObj
	accStr = accObj.appenAccStr()
	let hierarchyUids = Array<string>()

	for (const key in nextObj) {
		let RAW_OBJ = nextObj[key]

		if (!isAnObjectWith(RAW_OBJ, key, nextObj)) continue

		if (key == 'baseKey') {
			if (RAW_OBJ.examined == false)
				RAW_OBJ = await createBaseKey(RAW_OBJ, accObj)

			hierarchyUids = [...hierarchyUids, RAW_OBJ?.uid]
		}

		const nextAccObj: IBaseAcc = {
			parentKey: key,
			accKeys: [...accObj.accKeys, key],
			accHierarchyUids: [...accObj.accHierarchyUids, ...hierarchyUids],
			accStr: accStr,
			nextStr: RAW_OBJ.string || '',
			appenAccStr,
			tab: '',
		}

		accStr = await Rec_CreateMissingBLocks(nextObj[key], nextAccObj) // recursion with await - 🤯

		if (RAW_OBJ.examined == false) {
			RAW_OBJ = await createInlineSetting(
				nextAccObj,
				RAW_OBJ,
				hierarchyUids.Last()
			)
		}
	}

	return accStr
}
// 🧱🧱🧱
async function createBaseKey(nestedPpt: TDomProperty, accObj: IBaseAcc) {
	let preStr: string
	const prntKeyToInlineKey = accObj.parentKey

	if (nestedPpt.baseValue != undefined) {
		// in most cases it't children will add up information about it
		preStr = validThirdParameterSplit(nestedPpt)
	}

	// conventional - property that wraps others
	else {
		preStr = nestedPpt.string
	}

	const manualStt: IManualStt = {
		m_uid: accObj.accHierarchyUids.Last() || TARGET_UID,
		m_strArr: preStr ? [prntKeyToInlineKey, preStr] : [prntKeyToInlineKey],
		m_order: nestedPpt.order,
	}
	// prettier-ignore
	nestedPpt = await UIBlockCreation(nestedPpt, manualStt) as TDomProperty;
	return nestedPpt
}
function isAnObjectWith(nestedPpt: any, property: s, nextObj: any) {
	return (
		nextObj.hasOwnProperty(property) &&
		//@tsignore-flag
		typeof nextObj[property] === 'object' &&
		//@tsignore-flag
		nextObj[property] != null &&
		!(nestedPpt instanceof Array)
	)
}
async function createInlineSetting(
	nextAccObj: IBaseAcc,
	nestedPpt: TProperty,
	m_uid: s
) {
	const manualStt = {
		m_uid: m_uid,
		m_strArr: [
			nextAccObj.accKeys.Last(),
			validThirdParameterSplit(nestedPpt),
		],
		m_order: nestedPpt.order,
	}

	nestedPpt = (await UIBlockCreation(nestedPpt, manualStt)) as TProperty
	return nestedPpt
}
async function UIBlockCreation(keyObj: TProperty, manual: IManualStt) {
	const { m_order, m_uid, m_join, m_strArr } = manual
	const { uid, string } = fmtSettings(m_strArr, m_join || keyObj.join)
	const { order: selfOrder } = keyObj

	await createBlock(
		m_uid || TARGET_UID,
		m_order || selfOrder || 10000,
		string,
		uid
	)
	await checkReorderBlockObj(m_uid, m_order, keyObj)
	return AssignExamineProperty(keyObj, string, uid)
	//#region local utils
	function fmtSettings(strArr: s[], splitter = fmtSplit) {
		const manualUID = createUid()
		const preBlockStr = [`(${manualUID})`, ...strArr]
		const blockStr = preBlockStr.join(splitter)
		return <const>{
			uid: manualUID,
			string: blockStr,
		}
	}
	//#endregion
}
function validThirdParameterSplit(nestedPpt: TProperty) {
	if (nestedPpt.join == fmtSplit) {
		const value = (nestedPpt.sessionValue = nestedPpt.baseValue)
		return (nestedPpt.caputuredValue = `${cptrPrfx}${value}${cptrSufx}`) // BIG BOI  <value>
	}
	//else if (nestedPpt.join == PmtSplit) {
	return nestedPpt.string
	//}
}
function appenAccStr(this: IBaseAcc): string {
	return this.accStr + '\n' + this.nextStr
}

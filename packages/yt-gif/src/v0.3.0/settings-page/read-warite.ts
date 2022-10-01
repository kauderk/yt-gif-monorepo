import {
	getBlockInfoByUIDM,
	getBlockParentUids,
	updateBlock,
	sleep,
	moveBlock,
} from '$lib/utils-roam-alpha-api'
import type {
	T_SettingsAny,
	TBlock,
	TProperty,
	T_settings_map} from './types';
import {
	PmtSplit,
	fmtSplit,
	cptrPrfx,
	cptrSufx,
	int
} from './types'
import { TARGET_UID, TARGET_PAGE } from './keys'
import { AssignExamineProperty } from './utils'

class TAcc {
	keyFromLevel0: s = ''
	selfOrder: n = 0
}
class TRes {
	accStr: s = ''
	keyObjMap: T_settings_map = new Map()
	pendingBLocks2Displace: Function[] = []
	singleKeyEntries: string[] = []
}
interface IParentState {
	displaced: boolean // can loop throughout its children
	overrideKey?: any
}
interface IKeyMap {
	key: string
	map: T_settings_map
	has: (key?: string) => boolean
	get: (key?: string) => T_SettingsAny | undefined
	crrUID: string
}
interface ICredential {
	success: boolean
	outKey: string
	outUid: string
}
interface IReadKeys {
	key: string
	nextStr: string
	uid: StrSearch
	join: string
	crrUID: string
	splitedStrArr: s[]
}
interface IWriteKeys {
	value: string
	caputuredValue: string
}
interface IParentKeys {
	get: () => IParentState
	uid: () => StrSearch
	indent: () => number
	accObj: () => TAcc
}

export async function Read_Write_SettingsPage(
	UID: s,
	keyObjMap = <T_settings_map>new Map()
) {
	keyObjMap.set(TARGET_PAGE, <T_SettingsAny>{ uid: TARGET_UID }) // the most special cases of them all... the actual page

	const ChildrenHierarchy = await getBlockInfoByUIDM(UID, true)

	const accObj = new TAcc()
	let accRes = { ...new TRes(), keyObjMap }

	if (!ChildrenHierarchy) {
		console.error(`No ChildrenHierarchy for uid: ${UID}`)
		return accRes.pendingBLocks2Displace // 'Page is empty'
	}

	accRes = await Rec_Read_Write_SettingsPage(
		ChildrenHierarchy[0][0],
		accObj,
		accRes
	)

	return accRes.pendingBLocks2Displace
}
async function Rec_Read_Write_SettingsPage(
	blockInfo: TBlockInfoRec,
	accObj: TAcc,
	accRes: TRes
) {
	const nextStr = blockInfo.string || blockInfo.title || ''
	let parentState: IParentState = {
		displaced: false, // to be changed inside the pending funcs
		overrideKey: null,
	}

	const keywords = getKeywordsFromBlockString(nextStr)
	const readKeys: IReadKeys = { ...keywords, nextStr, crrUID: blockInfo.uid }
	const writeKeys: IWriteKeys = { ...keywords }
	const parentKeys: IParentKeys = {
		uid: () => keywords.uid,
		indent: () => position.indent,
		get: () => parentState,
		accObj: () => accObj,
	}
	const mapObj: IKeyMap = {
		key: keywords.key,
		map: accRes.keyObjMap,
		has: (k?: string) => accRes.keyObjMap.has(k ?? mapObj.key),
		get: (k?: string) => accRes.keyObjMap.get(k ?? mapObj.key),
		crrUID: blockInfo.uid, // could be it's own obj
	}

	const position = await RelativeChildInfo(mapObj)
	// prettier-ignore
	const TRY = await ValidateTargetBlockObj(mapObj, accRes.singleKeyEntries, readKeys, blockInfo, parentState)
	// prettier-ignore
	const credentials = TRY.credentials ?? (await ReadWriteBlock(readKeys, writeKeys, TRY.block))

	if (TRY.block) {
		const ok = validNestFromThePast(TRY.block, parentKeys)
		accRes.pendingBLocks2Displace.push(async () =>
			OrderPossiblyMistakenBlock(ok, TRY.block, parentKeys, mapObj)
		)
	}
	// prettier-ignore
	if (credentials.success) {
		accRes.accStr = accRes.accStr + '\n' + position.tab + nextStr // outside of here, you'll the page before the changes
	}
	else if (wrongBlock(credentials)) {
		// prettier-ignore
		const asyncFunc = HandleFutureMove(credentials.outUid, parentKeys, readKeys, mapObj)
		if (asyncFunc) {
			accRes.pendingBLocks2Displace.push(asyncFunc)
		}
	}

	for (const child of blockInfo.children ?? []) {
		const nextAccObj: TAcc = {
			keyFromLevel0: blockInfo.overrideKey || keywords.key || TARGET_PAGE,
			selfOrder: child.order,
		}

		accRes = await Rec_Read_Write_SettingsPage(child, nextAccObj, accRes)
	}

	return accRes
}
// 🧱🧱🧱
function wrongBlock(c: ICredential) {
	return c.outUid != TARGET_UID && c.outKey != TARGET_PAGE
}
// var from obj .1
function getKeywordsFromBlockString(nextStr: s) {
	const rgxUid = new RegExp(/\(([^\)]+)\)/, 'gm') //(XXXXXXXX)
	const join = includesAtlest(nextStr, [PmtSplit, fmtSplit])
	const splitedStrArr = nextStr.split(join) // deconstruct
	const everyFirstKeyword = splitedStrArr.map(word => word.split(' ')[0]) // returns array of words

	const preUid = rgxUid.exec(everyFirstKeyword[0])
	const p_uid: StrSearch = preUid?.[1]

	const { value, caputureValueOk } = tryTrimCapturedValue(
		everyFirstKeyword[2] || ''
	)

	return <const>{
		uid: p_uid,

		key: everyFirstKeyword[1],

		caputuredValue: everyFirstKeyword[2],
		value: value,
		caputureValueOk,

		splitedStrArr,

		join,
	}
}
function tryTrimCapturedValue(string: s) {
	const prefix = string.substring(0, 1)
	const suffix = string.substring(string.length - 1, string.length)
	if (prefix == cptrPrfx && suffix == cptrSufx) {
		// < >
		return <const>{
			value: string.substring(1, string.length - 1),
			caputureValueOk: true,
		}
	}
	return <const>{
		value: string,
		caputureValueOk: false,
	}
}
function includesAtlest(string: s, Arr: s[]) {
	const match = Arr.filter(s => string.includes(s))
	return match.length > 0 ? match[0] : fmtSplit // filter first match or default
}
// var from obj .2
async function RelativeChildInfo(mapObj: IKeyMap) {
	const tab = '\t'
	let position = { indent: 0, parentUid: '' } // TODO: did lots of changes, don't know this even works

	if (mapObj.has()) {
		// tryto get existing setting, from assignChildrenMissingValues()
		const searchBlock = mapObj.get()! // @tsignore-flag No, typescript, this is not undefined

		position = mapObj.map.has(searchBlock.parentKey)
			? HandleNewParentUID(searchBlock, mapObj) // search within
			: await getRelativeInfoAsync(mapObj.crrUID) // find new one
	}

	if (!position.parentUid)
		position = await getRelativeInfoAsync(mapObj.crrUID)

	return <const>{
		tab: tab.repeat(position.indent),
		...position,
	}
}
function HandleNewParentUID(searchBlock: T_SettingsAny, mapObj: IKeyMap) {
	return <const>{
		indent: searchBlock.indent,
		parentUid: mapObj.get(searchBlock.parentKey)?.uid ?? '',
	}
}

async function getRelativeInfoAsync(crrUID: s) {
	let parentsHierarchy = await getBlockParentUids(crrUID)
	//if (!parentsHierarchy) console.error(`uid: ${crrUID} has no parents`)

	return <const>{
		indent: parentsHierarchy?.length ?? 0,
		parentUid: parentsHierarchy ? parentsHierarchy[0]?.[0].uid : TARGET_UID, // if undefined - most defenetly it's the direct child (level 0) of page
	}
}

/* ********************************************* */
// main logic
async function ReadWriteBlock(
	readKeys: IReadKeys,
	writeKeys: IWriteKeys,
	block: T_SettingsAny
) {
	// 1.2.1 make sure to read useful session values
	const { key, nextStr, uid, crrUID, join, splitedStrArr } = readKeys
	let p_string = nextStr
	const { v_uid, uidOk } = await validateBlockUid(uid, crrUID)
	const { v_string, stringOK } = await validateBlockContent(
		block as TBlock,
		splitedStrArr
	)

	if (!uidOk || !stringOK) {
		p_string = await UpdateRoamBlock_Settings(key, readKeys, v_string) // valid string for prompts
	}

	AssignExamineProperty(block, p_string, v_uid) // write

	if (join == fmtSplit && block.hasOwnProperty('sessionValue')) {
		Object.assign(block, UpdateInlineObj(writeKeys, block as TProperty)) // for and actual setting
	}

	return <const>{
		success: true,
		outKey: key,
		outUid: v_uid,
	}
}
async function ValidateTargetBlockObj(
	mapObj: IKeyMap,
	singleKeyEntries: string[],
	readKeys: IReadKeys,
	blockInfo: TBlockInfoRec,
	parentState: IParentState
) {
	const credentials: ICredential = {
		success: false,
		outKey: mapObj.key,
		outUid: mapObj.crrUID,
	}
	// 1.1
	if (mapObj.key && singleKeyEntries.includes(mapObj.key)) {
		// someone made a hard copy of a setting, deal with it
		if (mapObj.has()) {
			const invalidKey = `${mapObj.key}`.concat('_InvalidDuplicate')
			const n_string = await UpdateRoamBlock_Settings(
				invalidKey,
				readKeys
			)
			debugger
			//accObj.RoamObj.string = n_string;
			blockInfo.string = n_string
			parentState.overrideKey = invalidKey // it's facinating that this value will be lost in the recursion void - my understanding is that I can't grasp this shit... but attaching the value to a Rec_Fuc param as it's property... THAT! that will do the job... Facinating stuff indeed...
			blockInfo.overrideKey = invalidKey

			return <const>{
				block: null,
				credentials: {
					...credentials,
					outKey: invalidKey,
				} as ICredential,
			}
		}
	}

	// 1.0
	singleKeyEntries.push(mapObj.key) // keep track of any possible duplicates
	const block = mapObj.get()

	// 1.2
	if (!(block && mapObj.key != TARGET_PAGE))
		return <const>{
			block: null,
			credentials,
		}
	return <const>{
		block,
		credentials: null,
	}
}

async function validateBlockUid(caputuredUID: StrSearch, crrUID: string) {
	const uidOk = caputuredUID == crrUID // kinda redundant
	const v_uid = uidOk ? caputuredUID : crrUID // : nextUID;
	return <const>{
		uidOk,
		v_uid,
	}
}
async function validateBlockContent(obj: TBlock, splitedStrArr: s[]) {
	const caputuredString = splitedStrArr[2] || '' // undefinded means it doens't requieres a third param, that's ok

	let v_string = caputuredString
	let stringOK = true

	if (obj.string != caputuredString && obj.join == PmtSplit) {
		// kinda hardcoded...
		if (
			obj.uid != '' ||
			obj.string.includes(' / ') ||
			splitedStrArr[3] != undefined
		) {
			debugger
			/*
			If you are running this script twice in the same session
				- you will get an error here,
				  But if you write this command on the console...
					window.YT_GIF_DIRECT_SETTINGS = null
				  then you can run the script again
				- Keep in mind, the script is ment to be executed once PER SESSION
				  But If you get this error on startup,
				  Then it is a FATAL ERROR, please report it to the developer
					https://github.com/kauderk/kauderk.github.io/issues
			*/
			throw new Error(
				`YT GIF Settings Page: STOP! the string is invalid or was already set...`
			)
		}
		v_string = obj.string
		stringOK = false
	}

	return <const>{
		v_string,
		stringOK,
	}
}

// 1.1  - 1.2.2
async function UpdateRoamBlock_Settings(
	newKey: s,
	readKeys: IReadKeys,
	newString?: s
) {
	const { nextStr, uid, crrUID, join, splitedStrArr } = readKeys

	splitedStrArr.splice(0, 1, `(${crrUID})`) //.replace(/\(([^\)]+)\)/, `(${nextChildObj.uid})`);;
	splitedStrArr.splice(1, 1, newKey)

	if (newString) {
		splitedStrArr.splice(2, 1, newString)
	}

	const v_string = splitedStrArr.join(join || PmtSplit)
	await updateBlock(crrUID, v_string)
	await sleep(50)

	console.log(
		`Updating block  ((${uid})) -> \n ${nextStr} \n\nto ((${crrUID})) -> \nﾠ\n${v_string}`
	)
	return v_string
}

// 1.2.4
function UpdateInlineObj(writeKeys: IWriteKeys, crrObjKey: TProperty) {
	crrObjKey.sessionValue = writeKeys.value
	crrObjKey.caputuredValue = writeKeys.caputuredValue

	if (crrObjKey.inputType == int) {
		crrObjKey.sessionValue = parseInt(crrObjKey.sessionValue, 10)
	}

	// if (!caputureValueOk && splitedStrArr[2]) {
	// 	// caputured string too
	// 	console.warn(
	// 		`"${nextStr}" value looks weird, it will default to false...` // Why? // FIXME:
	// 	)
	// }
	return crrObjKey
}

// 1.2.5
async function OrderPossiblyMistakenBlock(
	validNestFromThePast: boolean,
	block: T_SettingsAny,
	parentKey: IParentKeys,
	mapObj: IKeyMap
) {
	const relevantParentUID = validNestFromThePast
		? parentKey.uid()
		: mapObj.get(block.parentKey)?.uid // block with proper indent? no, then nest it under it's most relevant parent

	if (parentKey.get().displaced == false) {
		// shall stay with it's parent then
		await TryToMoveBlock(relevantParentUID, block.order, block.uid)
		if (parentKey.accObj().keyFromLevel0 != block.parentKey) {
			await TryToMoveBlock(
				mapObj.get(block.parentKey)?.uid,
				block.order,
				block.uid
			)
		}
	}
}
function validNestFromThePast(block: T_SettingsAny, parentKey: IParentKeys) {
	const ok = isOrderOk(block, parentKey)
	if (ok) {
		parentKey.get().displaced = true
	}
	return ok
}

function isOrderOk(targeObj: T_SettingsAny, parentKeys: IParentKeys) {
	// validNestFromThePast
	return (
		targeObj.indent == parentKeys.indent() && // are you indented correctly?
		parentKeys.accObj().selfOrder == targeObj.order && // is your relative order alright?
		parentKeys.accObj().keyFromLevel0 == targeObj.parentKey // are you nested under the proper block?
	)
}
function GetSearchBlock(key: s, mapObj: IKeyMap) {
	const parentVal = mapObj.get(key)
	return parentVal
}
// 1.1
function HandleFutureMove(
	uidToMove: s,
	parentKey: IParentKeys,
	readKeys: IReadKeys,
	mapObj: IKeyMap
): Function | null {
	if (!uidToMove)
		throw new Error(
			`YT GIF Settings Page: STOP! a future block will try to move to an undefined place`
		)

	let Recycle_cb: Function | null = null

	if (parentKey.accObj().keyFromLevel0 == 'LogStatus') {
		// stop right here, else you'll assign the parent to the child
		return null
	}

	if (parentKey.accObj().keyFromLevel0 != 'DisplacedBlocks' && mapObj.key) {
		// move one block at a time and it's children along with it
		Recycle_cb = async () =>
			TryToMoveBlock(mapObj.get('DisplacedBlocks')?.uid, 0, uidToMove)
	} //
	else if (
		parentKey.accObj().keyFromLevel0 != 'UnknownBlocks' &&
		!readKeys.nextStr.includes(readKeys.join)
	) {
		// well well well don't delete it if you don't know what it is
		Recycle_cb = async () =>
			TryToMoveBlock(mapObj.get('UnknownBlocks')?.uid, 0, uidToMove)
	}

	// TODO: HUH this might be the bug I didn't notice the last time I touched this code
	parentKey.get().displaced = true

	return Recycle_cb
}

/* ********* */
async function TryToMoveBlock(parentUid: StrSearch, order: number, selfUid: s) {
	try {
		if (parentUid && selfUid && parentUid == selfUid) {
			throw new Error(
				`YT GIF Settings Page: STOP! Don't move block to itself =>         ${parentUid} ${selfUid}`
			)
		}
		if (!parentUid) return
		// throw new Error(
		// 	`YT GIF Settings Page: STOP! parentUid is undefined`
		// )
		moveBlock(parentUid, order, selfUid)
	} catch (err) {
		debugger
	}
}

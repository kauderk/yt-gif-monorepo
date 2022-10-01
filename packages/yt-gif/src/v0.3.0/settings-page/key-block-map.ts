import type { Ttype, T_settings_map } from './types'
import type { PAGE_TYPE } from './shape'
import { updateBlock } from '$lib/utils-roam-alpha-api'
import { TARGET_PAGE } from './keys'
import { Clone } from '$lib/utils'

class ILoop {
	parentKey: s = ''
	indent: n = -1
	accStr: s = ''
	nextStr: s = ''
	inputTypeFromBaseKey: Ttype = '' // so it can be used in the Func Rec_assignChildrenMissingValues
	accKeys?: string[] = [] // IParent
}
interface IobjAssign {
	indent: n
	order: n
	inputTypeFromBaseKey?: Ttype
}

export async function pageShape2BlockMap(page: PAGE_TYPE) {
	const keyObjMap = <T_settings_map>new Map() // acc inside the Rec_func
	const passAccObj = new ILoop()
	const _page = Clone(page)

	return <const>{
		pageAsText: await Rec_PageShape2BlockMap(_page, passAccObj, keyObjMap),
		keyObjMap,
		page: _page,
	}
}
async function Rec_PageShape2BlockMap(
	nextObj: any,
	accObj: ILoop,
	map: T_settings_map
) {
	let { accStr } = accObj
	let funcGeneralOrder = -1

	const { nextStr, indent } = accObj
	const tab = `\t`.repeat(indent < 0 ? 0 : indent)

	accStr = accStr + '\n' + tab + nextStr

	for (const key in nextObj) {
		const RAW_OBJ = nextObj[key]
		if (!isAnObjectWith(nextObj, RAW_OBJ, key)) continue

		const nextAccObj: ILoop = {
			parentKey: key,

			indent: indent + 1,
			inputTypeFromBaseKey: RAW_OBJ?.baseKey?.inputType,

			accStr: accStr,
			nextStr: RAW_OBJ.string || '',
		}

		if (key != 'baseKey') {
			map.set(key, PassDirectSetting(RAW_OBJ, accObj))
		}

		accStr = await Rec_PageShape2BlockMap(nextObj[key], nextAccObj, map)

		const getAssignObj = () => ({
			indent: nextAccObj.indent,
			order: Number(++funcGeneralOrder),
		})

		// 3. FIXME: Split the logic into two parts:
		if (RAW_OBJ.baseKey != undefined) {
			AssignBaseObj(RAW_OBJ, getAssignObj())
		}
		// InlinePmt and dom/setting so far // valid form baseKey? no, then keep same
		else if (RAW_OBJ.inlineObj == true) {
			AssignInlineObj(RAW_OBJ, {
				...getAssignObj(),
				inputTypeFromBaseKey: accObj.inputTypeFromBaseKey,
			})
		}
	}
	return accStr
}
// 🧱🧱🧱
function AssignInlineObj(RAW_OBJ: any, obj: IobjAssign) {
	RAW_OBJ.order = obj.order
	RAW_OBJ.indent = obj.indent

	RAW_OBJ.inputType = RAW_OBJ.inputType
		? RAW_OBJ.inputType
		: obj.inputTypeFromBaseKey
}
function AssignBaseObj(RAW_OBJ: any, obj: IobjAssign) {
	RAW_OBJ.baseKey.order = obj.order // the property (name) is a wrapper, look on it's level to access the baseKey
	RAW_OBJ.baseKey.indent = obj.indent
}
function PassDirectSetting(RAW_OBJ: any, accObj: ILoop) {
	const direct = RAW_OBJ?.baseKey ? RAW_OBJ.baseKey : RAW_OBJ
	direct.parentKey = accObj.parentKey || TARGET_PAGE // alright
	if (direct.UpdateSettingsBlockValue) {
		// an actual setting ... most definitely an inline Object
		direct.UpdateSettingsBlockValue = ClosureSettingsBlock(direct)
	}
	return direct
}
function ClosureSettingsBlock(RAW_OBJ: any) {
	return async function (replaceWith: s) {
		const rgxValue = new RegExp(/<(.*?)>/, 'gm') // "<XXX>"

		// const preChange = entry.string + ''
		const postChange = RAW_OBJ.string.replace(rgxValue, `<${replaceWith}>`)
		// well. don't make extra api calls
		if (postChange != RAW_OBJ.string) {
			RAW_OBJ.string = postChange
			RAW_OBJ.sessionValue = replaceWith
			await updateBlock(RAW_OBJ.uid, RAW_OBJ.string)
		}
	}
}
function isAnObjectWith(nextObj: o, target: o, key: s) {
	return (
		nextObj.hasOwnProperty(key) &&
		target &&
		typeof target === 'object' &&
		!(target instanceof Array)
	)
}

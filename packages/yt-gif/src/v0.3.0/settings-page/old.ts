import {
	getPageUidSync,
	getOrCreatePageUid,
	SetNumberedViewWithUid,
	CollapseDirectcChildren,
	getBlockInfoByUIDM,
	getBlockParentUids,
	updateBlock,
	sleep,
	createBlock,
	createUid,
	moveBlock,
} from '$lib/utils-roam-alpha-api'
export const TARGET_PAGE = 'roam/js/kauderk/yt-gif/other'
export let TARGET_UID = getPageUidSync(TARGET_PAGE)

const fmtSplit = ' : '
const PmtSplit = ' / '
const cptrPrfx = '<',
	cptrSufx = '>'

const chk = 'checkbox',
	sel = 'string',
	str = 'string',
	pmt = 'prompt',
	int = 'integer',
	bol = 'boolean',
	url = 'url',
	rng = 'range',
	rad = 'radio'
//prettier-ignore
type Ttype = '' | 'checkbox'| 'string' | 'prompt'| 'integer'| 'boolean'| 'url'| 'range' | 'radio'| Array<Ttype>

/**
 * @summary YT_GIF_SETTINGS_PAGE
 * @type Object
 * @description Actual user settings
 */
export const YT_GIF_SETTINGS_PAGE = {
	Workflow: {
		baseKey: BasePmt(`BIP BOP . . .`),
		joins: InlinePmt(
			`either "ﾠ:ﾠ" for actual settings or "ﾠ/ﾠ" for prompt guidelines`
		), // he doesn't know... wait- he knows "ﾠ" != " "
		parameters: {
			baseKey: BasePmt(
				'\n`(xxxuidxxx)` : `yt_gif_settings_key` : `<value>`'
			),
			uid: InlinePmt(
				"\n`(xxxuidxxx)`\nunique per user data base, without it the settings can't be written on this page"
			),
			key: InlinePmt(
				'\n`yt_gif_settings_key`\nsecond way to know which setting to change'
			),
			value: InlinePmt(
				'\n`<value>`\nin many cases optional and most of the time a binary switch, on - off'
			),
		},
		//reach: InlinePmt(`Blocks below "LogStatus" will be ignored`),
	},
	display: {
		baseKey: BaseSetting(chk),
		simulate_roam_research_timestamps: dom(),
		ms_options: dom('clip_lifespan_format', sel),
		fmt_options: dom('avoid_redundancy', sel),
		yt_playback_speed: dom('Default', sel),
	},

	timestamps: {
		baseKey: BaseSetting(sel),
		tm_recovery: dom('1', chk),
		tm_seek_to: dom('strict'),
		tm_restore: dom('match'),
		tm_reset_on_removal: dom('container'),

		tm_loop_hierarchy: dom('disabled'),
		tm_loop_to: dom('start'),
		tm_loop_options: dom('skip,include_player'),
		tm_seek_action: dom('disabled'),

		tm_workflow_display: dom('default'),
		tm_workflow_grab: dom('HMS'),
		tm_options: dom(''),
	},

	experience: {
		baseKey: BaseSetting(sel),

		initialize_mode: dom('buffer'),
		awaiting_input_type: dom('mouseenter'),
		xp_options: dom('thumbnail_as_bg'),
	},

	playerSettings: {
		baseKey: BaseSetting(sel),

		play_style: dom('strict'),
		mute_style: dom('strict'),
		fullscreen_style: dom('disabled'),

		url_boundaries: dom('strict'),
		url_volume: dom('strict'),

		ps_options: dom('mantain_last_active_player'),
	},

	range: {
		baseKey: BaseSetting(rng),
		timestamp_display_scroll_offset: {
			baseKey: BaseDom('5', int),
			tdso_opt: InlinePmt(`seconds up to 60`),
		},
		end_loop_sound_volume: {
			baseKey: BaseDom('50', int),
			elsv_opt: InlinePmt(`integers from 0 to 100`),
		},
		iframe_buffer_slider: {
			baseKey: BaseDom('10', int),
			ibs_opt: InlinePmt(`integers from 1 to 30`),
		},
	},
	defaultPlayerValues: {
		baseKey: BaseSetting(),
		player_span: {
			baseKey: BaseInitSetting('50%', str),
			ps_opt: InlinePmt(
				`empty means 50% - only valid css units like px  %  vw`
			),
			pv_opt_2: InlinePmt(
				"each block's url parameter `&sp=` has priority over this"
			),
		},
		player_volume: {
			baseKey: BaseInitSetting(40, int),
			vv_opt: InlinePmt(`integers from 0 to 100`),
			pv_opt: InlinePmt(
				"each block's url parameter `&vl=` has priority over this"
			),
		},
		player_interface_language: {
			baseKey: BaseInitSetting('en', str),
			pil_opt: InlinePmt(
				"each block's url parameter `&hl=` has priority over this"
			),
			pli_guide: InlinePmt(
				`https://developers.google.com/youtube/player_parameters#:~:text=Sets%20the%20player%27s%20interface%20language.%20The%20parameter%20value%20is%20an%20ISO%20639-1%20two-letter%20language%20code%20or%20a%20fully%20specified%20locale.%20For%20example%2C%20fr%20and%20fr-ca%20are%20both%20valid%20values.%20Other%20language%20input%20codes%2C%20such%20as%20IETF%20language%20tags%20(BCP%2047)%20might%20also%20be%20handled%20properly.`
			),
		},
		player_captions_language: {
			baseKey: BaseInitSetting('en', str),
			pcl_opt: InlinePmt(
				"each block's url parameter `&cc=` has priority over this"
			),
			pcl_guide: InlinePmt(
				`https://developers.google.com/youtube/player_parameters#:~:text=This%20parameter%20specifies%20the%20default%20language%20that%20the%20player%20will%20use%20to%20display%20captions.%20Set%20the%20parameter%27s%20value%20to%20an%20ISO%20639-1%20two-letter%20language%20code.`
			),
		},
		player_captions_on_load: {
			baseKey: BaseInitSetting('true', bol),
			pcol_guide: InlinePmt(
				"Browsers love to cash data... if set to -true- most certently you'll get caption on load, but it's hard to tell otherwise... Also, the mix and match of diferent `&hl=` and `&cc=` can cause to not show the captions on load"
			),
		},
	},
	defaultValues: {
		baseKey: BaseSetting(),
		override_roam_video_component: {
			baseKey: BaseInitSetting('', [bol, str]),
			orvc_opt: InlinePmt(
				'distinguish between `{{[[video]]:}}` from `{{[[yt-gif]]:}}` or "both" which is also valid'
			),
		},
		end_loop_sound_src: {
			baseKey: BaseInitSetting(
				'https://freesound.org/data/previews/256/256113_3263906-lq.mp3',
				url
			),
			elss_opt: InlinePmt(
				`src sound when yt gif makes a loop, empty if unwanted`
			),
		},
		override_simulate_url_to_video_component: {
			baseKey: BaseInitSetting('', bol),
			orsuvc_opt: InlinePmt(
				`Because of browsers' external problems, I'd like to set this as the "usage key" replacement`
			),
		},
		YT_API_KEY_V3: {
			baseKey: BaseInitSetting('', str),
			yakv_opt: InlinePmt(``),
		},
		InAndOutKeys: {
			baseKey: BaseInitSetting('ctrlKey', str),
			iaok_opt: InlinePmt(
				`Any permutation of: altKey, shiftKey, ctrlKey \nfollowed by a "," coma\n\nMiddle mouse button is on by default`
			),
		},
	},
	dropdownMenu: {
		baseKey: BaseSetting(),
		ddm_css_theme_input: {
			baseKey: BaseInitSetting('', chk),
			ct_opt: InlinePmt(`"dark" == "true" or "light" == "false"`),
		},
	},
	LogStatus: {
		baseKey: BasePmt(`Everything looks alright :D`),
		DisplacedBlocks: {
			baseKey: BasePmt(
				`invalid -> settings block - deleted - deprecated\n**__If you encounter any nested blocks, it's extremely advisable that you delete them__**`
			),
		},
		UnknownBlocks: {
			baseKey: BasePmt(
				`... to the YT GIF SETTINGS PAGE script algorithm-functions`
			),
		},
		ls_: InlinePmt(`End of settings`),
	},
}
window.YT_GIF_SETTINGS_PAGE = YT_GIF_SETTINGS_PAGE
window.YT_GIF_SETTINGS_PAGE.Workflow.baseKey.string = `The ${
	Object.keys(window.YT_GIF_SETTINGS_PAGE).length
} blocks will be -added on updates- and -removed if deprecated- automatically. The last parameters "<>" are customizable. 🐕 👋`

export interface T_SettingsAny extends TBlock, Tprimitive {
	sessionValue?: string | number | boolean
	UpdateSettingsBlockValue: (replaceWith: string) => Promise<void>
}
export type T_settings_map = Map<string, T_SettingsAny>

// this looks like a bad idea...
//window.YT_GIF_DIRECT_SETTINGS = <T_settings_map>new Map()
window.YT_GIF_SETTINGS_PAGE_INIT = async () => await init()

async function init() {
	const { acc, keyObjMap } = await assignChildrenMissingValues()
	window.YT_GIF_DIRECT_SETTINGS = keyObjMap // the performance will increase dramatically if ONLY un-examined keyObjs are reviewd inside addAllMissingBlocks  keyObjMap.fiter(x=>!examined) or something like that...

	if (!TARGET_UID) {
		// Brand new installation
		TARGET_UID = await getOrCreatePageUid(TARGET_PAGE) //navigateToUiOrCreate : getOrCreatePageUid
		await addAllMissingBlocks() // 🐌
		await SetNumberedViewWithUid(TARGET_UID)
		await CollapseDirectcChildren(TARGET_UID, false)
	} // Read and store Session Values
	else {
		// @ts-ignore
		window.YT_GIF_DIRECT_SETTINGS.set(TARGET_PAGE, { uid: TARGET_UID }) // the most special cases of them all... the actual page
		// prettier-ignore
		const pendingBLocks2Displace = await Read_Write_SettingsPage(TARGET_UID, keyObjMap) // 🐌
		await addAllMissingBlocks() // 🐌 // THEY WILL STACK UP AGAINS EACHOTHER IF THEY ARE NOT EXAMINED - careful, bud
		for (const cb_closure of pendingBLocks2Displace) //
			await cb_closure()
	}
}

//#region HIDDEN FUNCTIONS
async function assignChildrenMissingValues() {
	// 0.
	let keyObjMap: T_settings_map = new Map() // acc inside the Rec_func
	class ILoop {
		parentKey: s = ''
		indent: n = -1
		accStr: s = ''
		nextStr: s = ''
		inputTypeFromBaseKey: Ttype = '' // so it can be used in the Func Rec_assignChildrenMissingValues
		accKeys?: string[] = [] // IParent
	}

	const passAccObj = new ILoop()

	// 1.
	return <const>{
		acc: await Rec_assignChildrenMissingValues(
			//@tsignore-flag
			window.YT_GIF_SETTINGS_PAGE,
			passAccObj
		),
		keyObjMap,
	}

	// ♾️ 🧱🧱🧱
	async function Rec_assignChildrenMissingValues(
		nextObj: any,
		accObj: ILoop
	) {
		// 0. this Rec_Func won't return nothing per se
		let { accStr } = accObj
		let funcGeneralOrder = -1

		const { nextStr, indent } = accObj
		const tab = `\t`.repeat(indent < 0 ? 0 : indent)

		accStr = accStr + '\n' + tab + nextStr //accStr = accStr + '\n' + tab + accKeys.join(" ");

		for (const key in nextObj) {
			// objects passed by window.YT_GIF_DIRECT_SETTINGS templates
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
				AddBaseKey2DirectSettings(RAW_OBJ, key) // there are too many, filter a litle bit
			}

			accStr = await Rec_assignChildrenMissingValues(
				nextObj[key],
				nextAccObj
			)

			// 3. FIXME: Split the logic into two parts:
			if (RAW_OBJ.baseKey != undefined) {
				AssignBaseObj(RAW_OBJ, nextAccObj)
			}
			// InlinePmt and dom/setting so far
			else if (RAW_OBJ.inlineObj == true) {
				AssignInlineObj(RAW_OBJ, nextAccObj) // valid form baseKey? no, then keep same
			}
		}
		return accStr

		function AssignInlineObj(RAW_OBJ: any, nextAccObj: ILoop) {
			RAW_OBJ.order = Number(++funcGeneralOrder)
			RAW_OBJ.indent = nextAccObj.indent

			RAW_OBJ.inputType = RAW_OBJ.inputType
				? RAW_OBJ.inputType
				: accObj.inputTypeFromBaseKey
		}
		function AssignBaseObj(RAW_OBJ: any, nextAccObj: ILoop) {
			RAW_OBJ.baseKey.order = Number(++funcGeneralOrder) // the property (name) is a wrapper, look on it's level to access the baseKey
			RAW_OBJ.baseKey.indent = nextAccObj.indent
		}
		function AddBaseKey2DirectSettings(RAW_OBJ: any, key: string) {
			if (RAW_OBJ.UpdateSettingsBlockValue) {
				// an actual setting ... most definitely an inline Object
				RAW_OBJ.UpdateSettingsBlockValue = ClosureSettingsBlock(RAW_OBJ)
			}
			RAW_OBJ.parentKey = accObj.parentKey || TARGET_PAGE
			keyObjMap.set(key, RAW_OBJ)
		}
	}
	function ClosureSettingsBlock(RAW_OBJ: any) {
		return async function (replaceWith: s) {
			const rgxValue = new RegExp(/<(.*?)>/, 'gm') // "<XXX>"
			// const preChange = entry.string + ''
			const postChange = RAW_OBJ.string.replace(
				rgxValue,
				`<${replaceWith}>`
			)
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
}
async function Read_Write_SettingsPage(
	UID: s,
	keyObjMap: T_settings_map = new Map()
) {
	// 0.
	const ChildrenHierarchy = await getBlockInfoByUIDM(UID, true)
	class Tacc {
		accStr: s = ''
		keyFromLevel0: s = ''
		selfOrder: n = 0
	}
	const accObj = new Tacc()
	let FinishRec_thenDisplace_cbArr = new Array<Function>() // acc inside the Rec_Func

	if (!ChildrenHierarchy) {
		console.error(`No ChildrenHierarchy for ${UID}`)
		return FinishRec_thenDisplace_cbArr // 'Page is empty'
	}
	interface IparentState {
		displaced: boolean // can loop throughout its children
		overrideKey?: any
	}

	// 1.
	let singleKeyEntries: string[] // acc

	await Rec_Read_Write_SettingsPage(
		// entirePageText
		ChildrenHierarchy[0][0],
		accObj
	)

	// 🔚
	return FinishRec_thenDisplace_cbArr // @tsignore-flag this is assigned in the Rec_Func

	// ♾️ 🧱🧱🧱
	async function Rec_Read_Write_SettingsPage(
		blockInfo: TBlockInfoRec,
		accObj: Tacc
	) {
		// 0.
		const nextStr = blockInfo.string || blockInfo.title || ''
		let { accStr } = accObj
		let parentState: IparentState = {
			displaced: false, // can loop throughout its children
			overrideKey: null,
		}

		const { keyFromLevel0 } = accObj
		const {
			uid,
			key,
			value,
			caputuredValue,
			caputureValueOk,
			splitedStrArr,
			join,
		} = getKeywordsFromBlockString(nextStr) // var from obj .1
		const { tab, indent, parentUid } = await RelativeChildInfo(blockInfo) // var from obj .2
		const { succesful, outKey, outUid } = await SettingsBlockReading() // main logic

		// 1.
		if (!succesful) {
			// 1.1
			if (outUid != TARGET_UID && outKey != TARGET_PAGE)
				HandleFutureMove(outUid)
		} else {
			// 1.2
			accStr = accStr + '\n' + tab + nextStr // outside of here, you'll the page before the changes
		}

		// 2. continue recursion if there are nested roam blocks
		if (blockInfo.children) {
			const children = blockInfo.children

			// 3. rec
			for (const child of children) {
				const nextAccObj = {
					accStr: accStr,
					nextUID: uid,
					keyFromLevel0: blockInfo.overrideKey || key || TARGET_PAGE, // well well well - the page can't be avoided, can it?
					selfOrder: child.order,
					parentState: parentState,
					RoamObj: child,
				}

				accStr = await Rec_Read_Write_SettingsPage(child, nextAccObj)
			}
		}

		// 🔚
		return accStr // debugging purposes

		// var from obj .1
		function getKeywordsFromBlockString(nextStr: s) {
			const rgxUid = new RegExp(/\(([^\)]+)\)/, 'gm') //(XXXXXXXX)
			const join = includesAtlest(nextStr, [PmtSplit, fmtSplit])
			const splitedStrArr = nextStr.split(join) // deconstruct
			const everyFirstKeyword = splitedStrArr.map(
				word => word.split(' ')[0]
			) // returns array of words

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
			function tryTrimCapturedValue(string: s) {
				const prefix = string.substring(0, 1)
				const suffix = string.substring(
					string.length - 1,
					string.length
				)
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
		}
		// var from obj .2
		async function RelativeChildInfo(obj: TBlockInfoRec) {
			const tab = '\t'
			let position = { indent: 0, parentUid: '' } // TODO: did lots of changes, don't know this even works

			if (keyObjMap.has(key)) {
				// tryto get existing setting, from assignChildrenMissingValues()
				const searchBlock = keyObjMap.get(key)! // @tsignore-flag No, typescript, this is not undefined

				position = keyObjMap.has(searchBlock.parentKey)
					? HandleNewParentUID(searchBlock) // search within
					: await getRelativeInfoAsync() // find new one
			}

			if (!position.parentUid) position = await getRelativeInfoAsync()

			return <const>{
				tab: tab.repeat(position.indent),
				...position,
			}

			function HandleNewParentUID(searchBlock: T_SettingsAny) {
				return <const>{
					indent: searchBlock.indent,
					parentUid: GetParentSeachBlock(searchBlock)?.uid as string,
				}
			}

			async function getRelativeInfoAsync() {
				const parentsHierarchy = await getBlockParentUids(obj.uid)
				if (!parentsHierarchy)
					throw new Error(`${obj.uid} has no parents`)
				return <const>{
					indent: parentsHierarchy.length,
					parentUid: parentsHierarchy[0]
						? parentsHierarchy[0][0]?.uid
						: TARGET_UID, // if undefined - most defenetly it's the direct child (level 0) of page
				}
			}
		}

		/* ********************************************* */

		// main logic
		async function SettingsBlockReading() {
			// 1.0
			let returnObj = {
				succesful: false,
				outKey: key,
				outUid: blockInfo.uid,
			}

			// 1.1
			if (key && singleKeyEntries.includes(key)) {
				// someone made a hard copy of a setting, deal with it
				if (keyObjMap.has(key)) {
					const invalidKey = `${key}`.concat('_InvalidDuplicate')
					const n_string = await UpdateRoamBlock_Settings(invalidKey)
					debugger
					//accObj.RoamObj.string = n_string;
					blockInfo.string = n_string
					parentState.overrideKey = invalidKey // it's facinating that this value will be lost in the recursion void - my understanding is that I can't grasp this shit... but attaching the value to a Rec_Fuc param as it's property... THAT! that will do the job... Facinating stuff indeed...
					blockInfo.overrideKey = invalidKey

					return (returnObj = {
						succesful: false,
						outKey: invalidKey,
						outUid: blockInfo.uid,
					})
				}
			}

			// 1.0
			singleKeyEntries.push(key) // keep track of any possible duplicates
			const targeObj = keyObjMap.get(key)

			// 1.2
			if (targeObj && key != TARGET_PAGE) {
				// actual data reading & validation
				// 1.2.1 make sure to read usefull session values
				let p_string = nextStr
				const { v_uid, uidOk } = await validateBlockUid(uid)
				const { v_string, stringOK } = await validateBlockContent(
					//@tsignore-flag
					targeObj as TBlock,
					splitedStrArr
				)

				// 1.2.2
				if (!uidOk || !stringOK) {
					p_string = await UpdateRoamBlock_Settings(key, v_string) // for prompts
				}

				// global
				AssignExamineProperty(targeObj, p_string, v_uid)

				// 1.2.4
				if (
					join == fmtSplit &&
					targeObj.hasOwnProperty('sessionValue')
				) {
					Object.assign(
						targeObj,
						UpdateInlineObj(targeObj as TProperty)
					) // for and actual setting
				}

				// 1.2.5
				FinishRec_thenDisplace_cbArr.push(
					async () => await ToDisplaceInTheFuture(targeObj!) // @tsignore-flag shouldn't be undefined
				) //validNestFromThePast -> boolean

				// 🔚
				returnObj = {
					succesful: true,
					outKey: key,
					outUid: v_uid,
				}
			}

			return returnObj

			//1.2.1
			async function validateBlockUid(caputuredUID: StrSearch) {
				const uidOk = caputuredUID == blockInfo.uid // kinda redundant
				const v_uid = uidOk ? caputuredUID : blockInfo.uid // : nextUID;
				return <const>{
					uidOk,
					v_uid,
				}
			}
			async function validateBlockContent(
				obj: TBlock,
				splitedStrArr: s[]
			) {
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
				newString?: s,
				newUid = blockInfo.uid
			) {
				splitedStrArr.splice(0, 1, `(${newUid})`) //.replace(/\(([^\)]+)\)/, `(${nextChildObj.uid})`);;
				splitedStrArr.splice(1, 1, newKey)
				if (newString) splitedStrArr.splice(2, 1, newString)
				const v_string = splitedStrArr.join(join || PmtSplit)
				await updateBlock(newUid, v_string)
				await sleep(50)

				console.log(
					`Updating block  ((${uid})) -> \n ${nextStr} \n\nto ((${newUid})) -> \nﾠ\n${v_string}`
				)
				return v_string
			}

			// 1.2.4
			function UpdateInlineObj(crrObjKey: TProperty) {
				crrObjKey.sessionValue = value
				crrObjKey.caputuredValue = caputuredValue

				if (crrObjKey.inputType == int) {
					crrObjKey.sessionValue = parseInt(
						crrObjKey.sessionValue,
						10
					)
				}

				if (!caputureValueOk && splitedStrArr[2]) {
					// caputured string too
					console.warn(
						`"${nextStr}" value looks weird, it will default to false...`
					)
				}
				return crrObjKey
			}

			// 1.2.5
			async function ToDisplaceInTheFuture(searchBlock: T_SettingsAny) {
				const relevantParentUID = isOrderOk(searchBlock)
					? parentUid
					: GetParentSeachBlock(searchBlock).uid // block with proper indent? no, then nest it under it's most relevant parent

				if (parentState.displaced == false) {
					// shall stay with it's parent then
					await TryToMoveBlock(
						relevantParentUID,
						searchBlock.order,
						searchBlock.uid
					)
					if (accObj.keyFromLevel0 != searchBlock.parentKey) {
						await TryToMoveBlock(
							GetParentSeachBlock(searchBlock).uid,
							searchBlock.order,
							searchBlock.uid
						)
					}
				}
			}
			function isOrderOk(targeObj: T_SettingsAny) {
				//                          are you indented correclty?      is your relative order alright?        are you nested under the proper block?
				const validNestFromThePast =
					targeObj.indent == indent &&
					accObj.selfOrder == targeObj.order &&
					accObj.keyFromLevel0 == targeObj.parentKey
				if (validNestFromThePast) {
					parentState.displaced = true
				}
				return validNestFromThePast
			}
		}
		function GetParentSeachBlock(searchBlock: T_SettingsAny) {
			return GetSearchBlock(searchBlock.parentKey)
		}
		function GetSearchBlock(key: s) {
			const parentVal = keyObjMap.get(key)
			if (!parentVal) console.error('parentKey is undefined')
			return parentVal as T_SettingsAny
		}
		// 1.1
		function HandleFutureMove(uidToMove: s) {
			if (!uidToMove)
				throw new Error(
					`YT GIF Settings Page: STOP! a future block will try to move to an undefined place`
				)

			let Recylce_cb = null
			if (keyFromLevel0 != 'DisplacedBlocks' && key) {
				Recylce_cb = async () =>
					await TryToMoveBlock(
						GetSearchBlock('DisplacedBlocks').uid,
						0,
						uidToMove
					) // move one block at a time and it's children along with it
			} else if (
				keyFromLevel0 != 'UnknownBlocks' &&
				!nextStr.includes(join)
			) {
				Recylce_cb = async () =>
					await TryToMoveBlock(
						GetSearchBlock('UnknownBlocks').uid,
						0,
						uidToMove
					) // well well well don't delete it if you don't know what it is
			}
			if (Recylce_cb) {
				FinishRec_thenDisplace_cbArr.push(Recylce_cb)
			}
			parentState = {
				displaced: true,
				// TODO: HUH this might be the bug I didn't notice the last time I touched this code
			}
		}

		/* ********* */
		async function TryToMoveBlock(parentUid: s, order: number, selfUid: s) {
			try {
				if (parentUid && selfUid && parentUid == selfUid) {
					throw new Error(
						`YT GIF Settings Page: STOP! Don't move block to itself =>         ${parentUid} ${selfUid}`
					)
				}
				moveBlock(parentUid, order, selfUid)
			} catch (err) {
				debugger
			}
		}
	}
}
async function addAllMissingBlocks() {
	class IBaseAcc {
		accStr: string = ''
		nextStr: string = ''
		accKeys: string[] = []
		accHierarchyUids: string[] = []
		tab: string = '' // IRecursiveAcc
		parentKey: string = '' // IRecursiveAcc
	}
	// 0.
	const ACC_OBJ = new IBaseAcc()
	interface IManualStt {
		m_uid: string
		m_strArr: Array<string>
		m_order: number
		m_join?: string
	}

	// 1.
	return await Rec_addAllMissingBlocks(window.YT_GIF_SETTINGS_PAGE, ACC_OBJ)

	// ♾️ 🧱🧱🧱
	async function Rec_addAllMissingBlocks(nextObj: any, accObj: IBaseAcc) {
		// 0.
		let { accStr } = accObj
		const { tab, nextStr } = accObj

		accStr = accStr + '\n' + tab + nextStr
		let HierarchyUids = Array<string>()

		for (const key in nextObj) {
			// @tsignore-flag
			let RAW_OBJ = nextObj[key]

			if (!isAnObjectWith(RAW_OBJ, key)) continue

			// 1.
			if (key == 'baseKey') {
				if (RAW_OBJ.examined == false) {
					RAW_OBJ = await createBaseKey(RAW_OBJ)
				}

				HierarchyUids = [...HierarchyUids, RAW_OBJ?.uid]
			}

			// 2.
			const nextAccObj: IBaseAcc = {
				parentKey: key,

				accKeys: [...accObj.accKeys, key],

				accHierarchyUids: [
					...accObj.accHierarchyUids,
					...HierarchyUids,
				], // this is weird

				accStr: accStr,
				tab: `\t`.repeat(0),
				nextStr: RAW_OBJ.string || '',
			}

			accStr = await Rec_addAllMissingBlocks(nextObj[key], nextAccObj) // recursion with await - 🤯

			// 3.
			if (RAW_OBJ.examined == false) {
				RAW_OBJ = await createInlineSetting(nextAccObj, RAW_OBJ)
			}
		}

		// 🔚
		return accStr

		// 1.
		async function createBaseKey(nestedPpt: TDomProperty) {
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
				m_uid:
					accObj.accHierarchyUids[
						accObj.accHierarchyUids.length - 1
					] || TARGET_UID,
				m_strArr: preStr
					? [prntKeyToInlineKey, preStr]
					: [prntKeyToInlineKey],
				m_order: nestedPpt.order,
			}
			// prettier-ignore
			nestedPpt = await UIBlockCreation(nestedPpt, manualStt) as TDomProperty
			return nestedPpt
		}
		function isAnObjectWith(nestedPpt: any, property: s) {
			return (
				nextObj.hasOwnProperty(property) &&
				//@tsignore-flag
				typeof nextObj[property] === 'object' &&
				//@tsignore-flag
				nextObj[property] != null &&
				!(nestedPpt instanceof Array)
			)
		}

		// 3.
		async function createInlineSetting(
			nextAccObj: IBaseAcc,
			nestedPpt: TProperty
		) {
			const manualStt = {
				m_uid: HierarchyUids[HierarchyUids.length - 1],
				m_strArr: [
					nextAccObj.accKeys[nextAccObj.accKeys.length - 1],
					validThirdParameterSplit(nestedPpt),
				],
				m_order: nestedPpt.order,
			}

			nestedPpt = await UIBlockCreation(nestedPpt, manualStt)
			return nestedPpt
		}

		/* 🚙 */
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
	}
}
/* 🚙 🚙 🚙*/
// prettier-ignore
function AssignExamineProperty<T extends T_SettingsAny>(baseKeyObj: T, string: s, uid: s) {
	return Object.assign(baseKeyObj, {
		examined: true,
		uid: uid,
		string,
	}) as typeof baseKeyObj
}
async function checkReorderBlockObj(
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
//#endregion

//#region sub OBJECTS
/*---------------------------------------------*/

type Tprimitive = {
	uid: string
	examined: boolean
	parentKey: string
	string: string
	child: number
	indent: number
	inputType: Ttype
	order: number
	inlineObj: boolean
}
type join = typeof fmtSplit | typeof PmtSplit
type TBlock = Tprimitive & {
	join: join
}
type TInline = Tprimitive & TBlock

type Tk = {
	baseValue: string | number
	inputType: Ttype
}
type TProperty = TBlock &
	Tk & {
		sessionValue: string | number
		caputuredValue: string
		UpdateSettingsBlockValue: (replaceWith: string) => Promise<void>
	}
type Tdom = Tk & {
	domEl: ''
}
type TDomProperty = TProperty & Tdom

function InlinePmt(blockContent = ''): TInline {
	return <const>{
		//promptObj
		...BasePmt(),
		inlineObj: true,
		string: blockContent,
	}
}
function BasePmt(blockContent = ''): TBlock {
	return <const>{
		//promptObj
		...baseTmp(),
		join: PmtSplit,
		inputType: pmt,
		string: blockContent,
	}
}
/*--------------------------------*/
function BaseSetting(inputType?: Ttype): Tprimitive {
	return baseTmp(inputType)
}
/*---------------------------------------------*/
function BaseDom(baseValue = '', inputType: Ttype): TDomProperty {
	return <const>{
		//domObj
		...subTemp(),
		domEl: '',
		baseValue: baseValue,
		inputType: inputType,
		inlineObj: false,
	}
}
function dom(baseValue = '', inputType: Ttype = ''): Tdom {
	return <const>{
		//domObj
		...subTemp(),
		domEl: '',
		baseValue: baseValue,
		inputType: inputType,
	}
}
/*--------------------*/
function BaseInitSetting(
	baseValue: string | number = '',
	inputType: Ttype
): TProperty {
	return <const>{
		//subInputObj
		...subTemp(),
		baseValue: baseValue,
		inputType: inputType,
		inlineObj: false,
	}
}
/*---------------------------------------------------------------*/
function subTemp(baseValue = '', inputType?: Ttype): TProperty {
	return <const>{
		...baseTmp(inputType),
		baseValue: baseValue,
		sessionValue: undefined as any,
		caputuredValue: '<>',
		join: fmtSplit,
		inlineObj: true,
		UpdateSettingsBlockValue: async function () {
			console.warn(
				//@tsignore-flag
				`Update block not implemented... ${this.uid} ${this.string}`
			)
		},
	}
}
function baseTmp(_inputType: Ttype = '', _string = ''): Tprimitive {
	return <const>{
		examined: false,

		uid: '',
		parentKey: '',
		string: _string,

		inputType: _inputType,

		indent: 0,
		child: 0,
		order: 0,

		inlineObj: false,
	}
}
/*---------------------------------------------------------------*/
//#endregion

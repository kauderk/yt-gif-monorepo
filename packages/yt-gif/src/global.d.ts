/// <reference types="@sveltejs/kit" />
import type { YT_GIF_OBSERVERS_TEMP } from '$v3/init/config/yt-gif-init'
import type util from '$lib/utils'
import type { rap } from '$lib/utils-roam-alpha-api'
import type { T_settings_map } from '$v3/settings-page/types'
import type { PAGE_TYPE } from '$v3/settings-page/shape'
import { onStateChange } from '$v3/player-change'
import { IFR, IFRH } from '$v3player-readylibIFR'

export {}

declare global {
	interface GridItem {
		id: string
		x: Number
		y: Number
		w: Number
		h: Number
		fixed: Boolean
		resizable: Boolean
		draggable: Boolean
		min: {
			w: Number
			h: Number
		}
		max: {
			w: Number
			h: Number
		}
		customDragger: Boolean
		customResizer: Boolean
	}
	interface IStickyNote {
		index: n
		text: s
	}
	type FElement = () => Element
	type FLastActiveTm = () => TlastActiveTm['lastActiveTimestamp']

	export type IFR = El
	export type IFRH = HTMLElement
	type TgetBlockID = (iframe: HTMLIFrameElement) => string

	interface ICustomPlayerReady {
		start: number
		end: number
		page: string
		updateTime: number
		playRightAway: boolean
		mute: boolean
		obsTimestamp: TlastActiveTm['lastActiveTimestamp']
	}
	type ILocalWrapperParam = ILocalWrapper | {}
	interface ILocalWrapper {
		getCrrContainer: () => El
		getTargetWrapper: () => El | null
		getLocalBlockID: () => string
		getObsTimestamp: () => TlastActiveTm['lastActiveTimestamp'] | null
		delObsTimestmp: () => void
		setObsTimestamp: (
			commonObj: TlastActiveTm['lastActiveTimestamp']
		) => void
		switchTimestampObsOnAchor: (e: Event) => void
	}
	type SNB = string | number | boolean
	interface HTMLElement {
		//adds definition to Document, but you can do the same with HTMLElement
		addEventListener<K extends string, EV extends CustomEvent<T>>(
			type: K,
			listener: (ev: EV) => void
		): void
	}
	interface Window {
		AvoidCircularDependency: {
			getCurrentClassesToObserver: () => string[]
			getOnStateChange: () => (state: YT_IFRAME) => Promise<void>
		}
		Gif: GifClass
		YT_GIF_SETTINGS_PAGE_INIT(): Promise<void>
		YT_GIF_SETTINGS_PAGE: PAGE_TYPE
		YT_GIF_DIRECT_SETTINGS: T_settings_map
		kauderk: {
			util: typeof util
			rap: typeof rap
		}
		YT
		roamAlphaAPI
		YT_GIF_OBSERVERS: typeof YT_GIF_OBSERVERS_TEMP
		ddm_html
		YTGIF: {
			getTimestampObj: Function
		}
	}
	interface HTMLOptionElement {
		customSelect: (bol: boolean) => void
		customHandleSelect: () => void
		fake: HTMLElement
	}
	interface IBtn extends HTMLElement {
		tryToAppendUrlBtns: Function
		a: HTMLElement
	}
	interface IBtnArrObj extends IBtn {
		OnClicks: (e: T_TmClickDetailEvent) => Promise<void>
		validateSelf: (v: number) => void
	}
	interface ItimeObjs {
		lessHMS: Itm
		HMS: Itm
		hmsSufix: Itm
		S: Itm
		//uid?: string
	}
	interface IlocalTimeObjs extends ItimeObjs {
		uid: string
	}
	interface Itm {
		value: string | number
		fmt: string
	}
	interface Itime {
		lessHMS: Itm
		HMS: Itm
		hmsSufix: Itm
		S: Itm
	}

	type FString = () => string
	type FNumber = () => number
	type FVoid = () => void

	interface HTMLResetBtn extends HTMLElement {
		ResetBoundaries_smart: (e: TResetYTEvent | null) => Promise<void>
	}
	interface T_TmReset {
		message?: string
		blockID?: string
	}
	interface TResetYTEvent extends T_TmReset {
		currentTarget?: HTMLElement
		['delete-obs-tm']?: boolean
	}
	interface T_ResetWrapper extends TResetYTEvent {
		['delete-obs-tm']: boolean
	}
	interface TBlockInfo {
		open: boolean
		order: number
		string: s
		uid: s
	}
	interface TBlockInfoRec extends TBlockInfo {
		children?: TBlockInfoRec[]
		// useful when reading recursive data
		title?: s
		overrideKey?: s
	}
	type TActiveTm = { index: number }
	interface TlastActiveTm {
		lastActiveTimestamp: {
			target: Itms & TActiveTm
			blockIndex: number
			workflow: string
			start: TActiveTm
			end: TActiveTm
			blockID: string
		}
		//workflow?: string
	}
	interface Element {
		queryAllasArr<type = Element>(length: string): type[]
	}
	interface Document {
		queryAllasArr<type = Element>(length: string): type[]
	}
	interface ItmSetObj {
		pear:
			| (Itms & {
					ObjAsKey: {
						uid: s
						capture: s
					}
					block: HTMLElement
					targetNode: HTMLElement
					page: Tpage
			  })
			| null
		self: Itms
		//other: Itms
	}
	interface Itms {
		timestamp: string
	}
	type Tpage = 'yt-gif' | 'format' | 'url' | startEnd | 'start|end'
	interface TResObj {
		string: s
		start: number
		end: number
		uid: s

		capture: s
		to: Array<Tpage>
		from: {
			page: Tpage
			tmSetObj: ItmSetObj // FIXME: can be optional
		}
		recycledRequest: TBlockInfo[][]
	}
	interface TResObjExtraVals extends TResObj {
		from: {
			value: s
			param: s
			float?: boolean
		}
	}
	interface TResObjUrlBtn extends TResObj {
		from: TResObj['from'] & {
			sel: (s: s, p: Tpage) => s
		}
	}
	// FIXME:
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type TFmtCb = (o: any) => Promise<string>
	interface TblockUpd_fmt {
		block: El
		targetNode: El

		siblingSel: s
		selfSel: s

		getMap: () => Promise<Trm_map>
		isKey: isKey

		fmtCmpnt_cb: TFmtCb
		tempUID: s

		from: TResObj['from']
		//caster?: string
	}
	interface TblockUpd_UrlBnt extends TblockUpd_fmt {
		from: {
			page?: Tpage
			caster: string
			urlBtn: El
		}
	}
	interface DOMEvent<T extends EventTarget> extends Event {
		readonly target: T
		readonly currentTarget: T
	}
	interface T_ElEvent<T = El> {
		readonly target: T
		readonly currentTarget: T
	}
	interface T_TmClickDetailEvent extends MouseEvent {
		currentTarget: IBtn
		which: number
		seekToMessage: string
		mute: boolean
		simMessage: string
	}
	interface TClickEventOverride {
		simMessage?: string
		seekToMessage?: string
	}
	type startEnd = 'start' | 'end'
	type rm_key = 'video' | 'yt_gif' | 'both'
	type isKey =
		| 'is tooltip card'
		| 'is substring'
		| 'is component'
		| 'is alias'
		| 'is block reference'

	interface CustomEventInit {
		cancelBubble: boolean
	}

	interface TObjAsKey {
		indent: number
		uid: string
		similarCount: number
		isKey: isKey
		isKeyOrder: number
		order: number
		capture: string
	}

	type s = string
	type o = Object
	type n = number
	type b = boolean
	type Tsession = 'strict' | 'soft'
	type El = Element
	type TmuteStyle = Tstyles | 'all_muted'

	type Tobserver = MutationObserver | IntersectionObserver
	type TExtractMatch = string | number | RegExpMatchArray
	type Trm_map = Map<string | TObjAsKey, string | Trm_map>
	type Tsm_map = Map<string | TObjAsKey, Trm_map>
	type Tsm_str = Map<string | TObjAsKey, string>
	type Trm_map_entry = [string | TObjAsKey, string | Trm_map]
	type StrSearch = string | undefined
	type BolSearch = boolean | undefined
	type QrySearch = Element | null
	type TGifTarget = 'yt-gif|video' | 'video' | 'yt-gif'

	interface Array<T> {
		Last(): T
	}
}

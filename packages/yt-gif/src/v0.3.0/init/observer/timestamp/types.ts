const componentClass = (page: string) =>
	`bp3-button bp3-small dont-focus-block rm-xparser-default-${page}`
export const timestampObj = <const>{
	roamClassName: 'rm-video-timestamp dont-focus-block',
	start: {
		targetClass: 'rm-xparser-default-start',
		buttonClass: componentClass('start'),
	},
	end: {
		targetClass: 'rm-xparser-default-end',
		buttonClass: componentClass('end'),
	},
	attr: {
		emulation: 'yt-gif-timestamp-emulation',
		timestampStyle: 'timestamp-style',
		timestamp: 'timestamp',
	},
	timestamp: {
		buttonClass: componentClass('timestamp'),
	},
	parent: {
		className: 'yt-gif-timestamp-parent',
	},
}
type T_startEndTmsObjs =
	| typeof timestampObj['start']
	| typeof timestampObj['end']
type T_TmsObjs = T_startEndTmsObjs & typeof timestampObj['timestamp']
// 6.1 on valid dom nodes get last component and add timestamp + click events
export type T_tmSetObj = {
	self: IArrObj
	pear: IArrObj | null
}
export interface IArrObj {
	fromUniqueUid: string
	similarCount: number
	page: startEnd
	indent: number
	targetIndex: number
	tempUID: string
	fromUid: string

	targetNode: IBtnArrObj
	appendToParent: Function
	targetNodeParent: Element

	timestamp: string
	hasAnyVideoUrl: StrSearch

	color: CSSStyleDeclaration['color']
	ObjAsKey: TObjAsKey
	blockUid: string
	block: HTMLElement
	blockID: string
	startEndComponentMap: Trm_map
}
interface ClickInput {
	uid: s
	tmSetObj: T_tmSetObj
}
export type IClickInput = Readonly<ClickInput>

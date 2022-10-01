export type Trm_block = { uid: string; string: string }
export interface ILastUrlObj {
	match: string
	index: number
	componentMap: Trm_map
	from: string
	ObjAsKey: TObjAsKey
}
export class TIframeMap {
	blockID: StrSearch = undefined
	start = 0
	end = 0
	HMS = 0
	crrTime: number | undefined = undefined
	condition = (sufix: string) => false
}
export type Itime = {
	lessHMS: string
	HMS: string
	hmsSufix: string
	S: string
}
export type IFilters = {
	targets: TIframeMap
	lastParams: TIframeMap
}

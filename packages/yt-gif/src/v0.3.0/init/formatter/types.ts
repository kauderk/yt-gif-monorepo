import { GetClosestRate } from '$lib/utils'
import type { TIndexPair } from './query/regex'

export type TcontentObj = {
	match: StrSearch
	hidden: string
	content: string
}
export type TpearCaptureObj = {
	hiddenObj: TIndexPair
	matchObj: TIndexPair
	contentObj: TcontentObj
}
const strCheck = {
	default: '',
	ok: (str: s) => str?.length > 0,
}
const boundCheck = {
	default: 0,
	ok: (v: number) => v > 0,
}
const playbackRates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]
export const toUrlKeys = {
	//'id',
	speed: {
		default: 1,
		ok: function (x: n) {
			return GetClosestRate(playbackRates, x) != this.default
		},
	},
	start: boundCheck,
	end: boundCheck,
	volume: {
		default: 40,
		ok: function (v: number) {
			return v != this.default && v >= 0
		},
	},
	hl: strCheck,
	cc: strCheck,
	sp: strCheck,
}
export type IDoubleParams = Array<keyof typeof toUrlKeys | Tpage>

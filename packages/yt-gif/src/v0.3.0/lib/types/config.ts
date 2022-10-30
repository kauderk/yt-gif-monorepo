import { BlockRegexObj } from '../utils'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import { TVideoParams } from '$v3/lib/types/video-types'
import { T_YT_RECORD } from './yt-types'
import { Wild_Config } from './Wild_Config'

export const recordedIDs = new Map<string, T_YT_RECORD>()
export const allVideoParameters = new Map<string, IExtendedVideoParams>()
export const lastBlockIDParameters = new Map<string, TVideoParams>()
export const observedParameters = new Map<string, TlastActiveTm>()
// FIXME: split into string map and KeyObj map
export const anchorInstanceMap: Trm_map = new Map()
export const UIDtoURLInstancesMapMap = new Map<string, number>() // since it store recursive maps, once per instance it's enough
export const YTvideoIDs = new Map<string, number>()

export const s_u_f_key = 'simulate_url_formatter'

/* */
export interface ICongif {
	componentPage: string
	targetStringRgx: RegExp
	scatteredMatch?: boolean
}
export class StartEnd_Config {
	static readonly componentPage = 'yt-gif\\/(start|end)'
	static readonly targetStringRgx: RegExp =
		/(\d+h)(\d+m)|(\d+h)?(\d+m)?(\d+s)|(\d+m)|(\d+h)|((\d{1,2}):)?((\d{1,2}):)((\d{1,2}))|(\d+(?:(\.\d{1})|(?=\s|\}|\w+|$)))/
}
export class YTGIF_Config {
	static componentPage: TGifTarget = 'yt-gif|video' // this needs to change dynamically
	static readonly targetStringRgx =
		/https\:\/\/(www\.)?(youtu(be.com\/watch|.be\/))?(.*?(?=\s|$|\}|\]|\)))/
	static readonly minimalRgx = /(?:\s|^)(\/[^:|\s|}|\]|\)]{11,})/ // /yt-id-with-11 characters
	static readonly guardClause = (url: unknown) =>
		typeof url == 'string' && !!url.match('https://(www.)?youtube|youtu.be')
}
export class URL_Config {
	static readonly componentPage = Wild_Config.componentPage
	static readonly scatteredMatch = true // alright
	static readonly targetStringRgx = YTGIF_Config.targetStringRgx
}

export const anchorsRgx = BlockRegexObj('yt-gif/anchor|yt-gif')
export class Anchor_Config {
	static readonly componentPage = 'yt-gif/anchor|yt-gif'
	static readonly componentRgx = anchorsRgx.componentRgx
	static readonly uidRefRgx = new RegExp(
		`\\(\\(${anchorsRgx.anyUidRgx.source}\\)\\)`,
		'gm'
	)
	static readonly targetStringRgx = new RegExp(
		`${YTGIF_Config.targetStringRgx.source}|${anchorsRgx.anyUidRgx.source}`,
		'gm'
	)
}

/* ------------------ */
export const videoParams = new TVideoParams()
export const sessionIDs = new T_YT_RECORD()

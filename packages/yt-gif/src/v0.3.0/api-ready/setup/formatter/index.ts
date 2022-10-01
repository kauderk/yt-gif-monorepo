import { fmtIframe2Url } from '$v3/init/formatter/Flow/url'
import { fmtTimestampsUrlObj } from '$v3/init/formatter/Flow/timestamp'
import type { T_YT_RECORD } from '$v3/lib/types/yt-types'
import type { IInstance} from './query';
import { OnYtGifUrlBtn, OnYtGifInsertBtn } from './query'
import { valid_url_formatter } from '$v3/init/formatter/button/validation'
import { appendVerticalUrlBtns } from '$v3/init/formatter/button/creation'

export function tryToInsertControls(instance: IInstance, record: T_YT_RECORD) {
	const { wrapper } = instance

	appendVerticalUrlBtns(
		wrapper.querySelector('[insertOptions]')!,
		'insertOptions'
	)
	const iframe2urlObj = fmtIframe2Url(wrapper, '[insertOptions]')

	if (!valid_url_formatter()) return iframe2urlObj?.confirmBtns()

	AppendURLButtons(wrapper, instance)
	// FIXME: avoid passing iframe2urlObj
	AppendInsertButtons(iframe2urlObj, record, instance)
}
function AppendInsertButtons(
	iframe2urlObj: {
		urlBtn: (page: 'start' | 'end' | 'speed' | 'format') => IBtn
		instParam: (o: TResObjExtraVals) => Promise<string>
	},
	record: T_YT_RECORD,
	instance: IInstance
) {
	const { instParam, urlBtn: instBtn } = iframe2urlObj
	const t = () => record?.wTarget
	const tick = () => parseInt(t()?.getCurrentTime()?.toString()!) || 0
	const rate = () => t()?.getPlaybackRate() || 1
	const InsertBtn = (e: MouseEvent, o: {}) =>
		OnYtGifInsertBtn(e, instParam, instance, o)

	instBtn('start').onclick = async e =>
		InsertBtn(e, { param: 't', value: tick() })
	instBtn('end').onclick = async e =>
		InsertBtn(e, { param: 'end', value: tick() })
	instBtn('speed').onclick = async e =>
		InsertBtn(e, { param: 's', value: rate(), float: true })
}

function AppendURLButtons(wrapper: Element, instance: IInstance) {
	appendVerticalUrlBtns(wrapper.querySelector('[formatter]')!) // shouldn't be null
	const { startCmpt, endCmpt, startEndCmpt, compt2Url, urlBtn, confirmBtns } =
		fmtTimestampsUrlObj(wrapper, '[formatter]')

	urlBtn('url').onclick = async e => OnYtGifUrlBtn(e, compt2Url, instance)
	urlBtn('start').onclick = async e => OnYtGifUrlBtn(e, startCmpt, instance)
	urlBtn('end').onclick = async e => OnYtGifUrlBtn(e, endCmpt, instance)
	urlBtn('start|end').onclick = async e =>
		OnYtGifUrlBtn(e, startEndCmpt, instance)
	confirmBtns()
}

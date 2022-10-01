import { GetUrlBtn, GetConfirmBtns } from '../../button/creation'
import { Format } from './Format'
import type { Tpage} from './types';
import { btnNames } from './types'
import { ExamineResObj, FilterToUrl } from './filter'

export function fmtIframe2Url(
	targetNode: El,
	innerWrapperSel = '.yt-gif-url-btns'
) {
	const urlBtn = GetUrlBtn<Tpage>(targetNode, innerWrapperSel)
	const { getters: _, trim } = Format()
	return <const>{
		urlBtn,
		confirmBtns: GetConfirmBtns(btnNames, urlBtn),
		instParam: async (o: TResObjExtraVals) => {
			await ExamineResObj(o).then(trim)
			return `{{[[yt-gif]]: ${_.u} ${_.h}}}`
		},
		updUrl: async (o: TResObj) => {
			o.to = ['url']
			await FilterToUrl(o).then(trim)
			return `${_.u}${_.h}`
		},
	}
}

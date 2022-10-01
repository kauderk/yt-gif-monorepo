import { GetUrlBtn, GetConfirmBtns } from '../../button/creation'
import { StopPropagations, btnNames, startTm, endTm } from './query'
import { Format } from './Format'
import { ExamineResObj } from './examine'
import type { o } from './types'

export function fmtTimestampsUrlObj(
	targetNode: El,
	innerWrapperSel = '.yt-gif-url-btns'
) {
	const urlBtn = GetUrlBtn<Tpage>(targetNode, innerWrapperSel)
	StopPropagations(urlBtn, targetNode)
	const { getters: _, trim, concatNoCmpt } = Format()
	return <const>{
		startTm,
		endTm,
		urlBtn,
		confirmBtns: GetConfirmBtns(btnNames, urlBtn),
		async ytGifCmpt(o: o) {
			o.to = ['yt-gif']
			await ExamineResObj(o).then(trim)
			return `{{[[yt-gif]]: ${_.u} ${_.h}}}`
		},
		async startCmpt(o: o) {
			o.to = ['start']
			await ExamineResObj(o).then(trim)
			return `{{[[yt-gif/start]]: ${startTm(_.u)} ${_.h}}}`
		},
		async endCmpt(o: o) {
			o.to = ['end']
			await ExamineResObj(o).then(trim)
			return `{{[[yt-gif/end]]: ${endTm(_.u)} ${_.h}}}`
		},
		async startEndCmpt(o: o) {
			o.to = ['start', 'end']
			await ExamineResObj(o).then(trim)
			// prettier-ignore
			return `{{[[yt-gif/start]]: ${startTm(_.u)} ${_.h}}} {{[[yt-gif/end]]: ${endTm(_.u)} }}`
		},
		async compt2Url(o: o) {
			o.to = ['url']
			await ExamineResObj(o).then(trim).then(concatNoCmpt)
			return `${_.u}${_.h}`
		},
	}
}

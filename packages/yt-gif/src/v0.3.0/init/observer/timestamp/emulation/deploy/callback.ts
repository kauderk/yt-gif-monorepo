import { toggleAttribute } from '$lib/utils'
import { isSelected } from '../../../../../lib/backend-frontend/option'
import { UI } from '../../../../config/yt-gif-init'
import { fmtTimestamp } from '../../../../timestamp/utils'
import { valid_url_formatter } from '$v3/init/formatter/button/validation'
import { appendVerticalUrlBtns } from '$v3/init/formatter/button/creation'
import type { IArrObj } from '../../types'
import { PlayPauseOnClicks } from '../../click'
import { SetUpUrlFormatter } from '../SetUpUrlFormatter'
import type { Checks, TPears } from './assign'

export function Callbacks(
	o: IArrObj,
	duration: n,
	{ validPear }: ReturnType<typeof Checks>,
	{ lastArr }: TPears
) {
	const tmSetObj = {
		self: o,
		pear: validPear ? lastArr.find(po => po != o) ?? null : null,
	}
	return <const>{
		async OnClicks(e: T_TmClickDetailEvent) {
			await PlayPauseOnClicks(e, { uid: o.tempUID, tmSetObj })
		},
		tryValidateSelf(d: number) {
			if (duration < 0) {
				return // doesn't make sense
			}
			if (duration == d && o.targetNode.hasAttribute('out-of-bounds'))
				return // already set, exit

			const tm = parseInt(fmtTimestamp('S')(o.timestamp))
			const bounded = tm >= 0 && tm <= duration // TODO: parseint(duration)

			toggleAttribute(!bounded, 'out-of-bounds', o.targetNode)
		},
		tryToAppendUrlBtns() {
			if (!valid_url_formatter()) return

			appendVerticalUrlBtns(o.targetNode)
			SetUpUrlFormatter(
				{ ...o },
				{
					pear: tmSetObj.pear,
					self: { ...o },
				}
			)

			if (!o.hasAnyVideoUrl) {
				const wrp = o.targetNode.querySelector(
					'.yt-gif-url-btns-wrapper'
				) as El // shouldn't be null
				const valid = isSelected(
					UI.display.fmt_options,
					'rely_on_hierarchy'
				)
				toggleAttribute(!valid, 'style', wrp, 'display: none')
				return toggleAttribute(true, 'no-url', wrp)
			}
		},
	}
}

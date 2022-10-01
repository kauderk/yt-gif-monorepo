import { div, getUniqueSelector, toggleClasses } from '$lib/utils'
import { getIconFlipObj } from '../dom/flip-tooltip'
import type { ITutorialInput } from './notification'
import { DeployTutorial } from './deploy'

export function toggleFoldAnim(bol: b, el: El) {
	toggleClasses(!bol, ['absolute'], el) // vertical
	toggleClasses(bol, ['w-full'], el) // horizontal
}
export function selectObj(select: HTMLSelectElement, input: ITutorialInput) {
	const ddm = select.closest('.ddm-tut')! // should't be null
	const tuts = ddm.querySelector('.yt-gifs-tuts')

	const options = Array.from(select.options).map(o => o.value)
	const htmls = [...options].reduce((acc, crr) => {
		const { item, itemHtmml } = assebleTutElm(crr)
		tuts?.appendChild(item)
		acc[crr] = itemHtmml
		return acc
	}, {} as { [key: string]: string })

	const target = (v: s) => ddm.querySelector(`[select="${v}"]`) as HTMLElement // alrigth...
	const html = (v: s) => htmls[v]

	return <const>{
		select,
		ddm,
		container: select.closest('.dropdown'),

		resetOptions: async function () {
			for (const value of options) {
				const wrapper = target(value)
				if (!(wrapper instanceof HTMLElement)) continue
				wrapper.style.display = 'none'
				wrapper.innerHTML = html(value)
			}
		},
		ShowOption: async function () {
			if (select.value == 'disabled') return toggleFoldAnim(false, ddm)

			toggleFoldAnim(true, ddm)

			const wrapper = target(select.value)
			wrapper.style.display = 'block'

			await DeployTutorial(wrapper, input)
		},
	}

	function assebleTutElm(crr: s) {
		const item = div(['dropdown-item'])
		item.setAttribute('select', crr)

		const tut = div()
		tut.setAttribute('data-video-url', `https://youtu.be/${crr}`)

		item.appendChild(tut)
		return <const>{ item, itemHtmml: item.innerHTML }
	}
}
export function getTutorialObj(container: El) {
	const btn = container.querySelector(
		'input[class*=bp3-icon-]'
	) as HTMLInputElement
	const pulseElm = container.querySelector(
		'.drodown_item-pulse-animation'
	) as El
	const iconObj = getIconFlipObj(btn) // bookmark
	const parentSelector = getUniqueSelector(
		container.querySelector('[data-video-url]')?.parentElement! // TODO: danger...
	)

	return <const>{
		iconObj,
		btn,
		pulseElm,
		id: container.id,
		target: () => container.querySelector(parentSelector!),
		ok: iconObj.falseVal && iconObj.trueVal && btn, // the btn can flip visually
	}
}

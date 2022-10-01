import type { IArrObj } from '../../types'
import type { GetPears } from './query'
import type { Callbacks } from './callback'

export function AssignCallbacks(
	o: IArrObj,
	callbacks: ReturnType<typeof Callbacks>
) {
	o.targetNode.oncontextmenu = e => e.preventDefault() //https://codinhood.com/nano/dom/disable-context-menu-right-click-javascript

	const { OnClicks } = callbacks
	// @ts-ignore
	o.targetNode.addEventListener('customMousedown', OnClicks)
	//@ts-ignore // FIXME: I need my own callbacks
	o.targetNode.onmousedown = OnClicks
	o.targetNode.OnClicks = OnClicks

	o.targetNode.validateSelf = callbacks.tryValidateSelf
	o.targetNode.tryToAppendUrlBtns = callbacks.tryToAppendUrlBtns
	callbacks.tryToAppendUrlBtns()
	// I'm using observers and these functions take just a little bit of longer to get attached, NOW it should be ok
	o.appendToParent()
}

export type TPears = ReturnType<typeof GetPears>
export function Checks(o: IArrObj, { lastArr, completePears }: TPears) {
	const isTmSet = lastArr.includes(o)
	const validPear = isTmSet && completePears

	return <const>{
		validPear,
		tryToCollapse() {
			if (isTmSet) {
				o.targetNode.setAttribute(
					'timestamp-set',
					completePears ? 'pears' : 'single'
				)
			}
		},
	}
}

import type { ITutorialInput } from './notification'
import { selectObj, toggleFoldAnim } from './query'

//#region 5. Setting up tutorials
export function SetUpSelectTutorials(input: ITutorialInput) {
	document
		.queryAllasArr<HTMLSelectElement>('.ddm-tut select')
		.filter(el => !!el)
		.map(sel => selectObj(sel, input))
		.forEach(ListenToDeploy)
}
function ListenToDeploy(o: ReturnType<typeof selectObj>) {
	toggleFoldAnim(false, o.ddm)

	o.select.addEventListener('change', async () => {
		o.resetOptions()
		await o.ShowOption()
	})
	o.container?.addEventListener('mouseenter', async () => o.ShowOption())

	// fire change on selected attr
	const selected = (o.select.querySelector('[selected]') as HTMLOptionElement)
		?.value
	if (selected) {
		o.select.dispatchEvent(new Event('change'))
	}
}

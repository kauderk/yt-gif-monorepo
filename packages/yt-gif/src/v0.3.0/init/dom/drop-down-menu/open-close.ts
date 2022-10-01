import { RemoveAllChildren } from '$lib/utils'

//#region Focus and close mainDDM
interface IDDMInput {
	mainDDM: HTMLElement
	ddm_focus: s
	mainMenu: HTMLElement
	initialDisplay?: s
}
export function DDMAction({
	mainDDM,
	mainMenu,
	ddm_focus,
	initialDisplay = 'none',
}: IDDMInput) {
	let previousValue = mainDDM.style.display // changes inside style_cb

	function display(d: s) {
		return (mainDDM.style.display = d)
	}
	function canClose() {
		return (
			!mainDDM.classList.contains(ddm_focus) &&
			!mainMenu.matches(':hover')
		)
	}
	function tryClose() {
		if (canClose())
			mainDDM
				.queryAllasArr('.dropdown-focus')
				.forEach(el => el.classList.remove('dropdown-focus'))
		return canClose() ? display('none') : null
	}
	function open() {
		return display('flex')
	}
	// function iconIsPulsing(bol: b) {
	// 	return UTILS.toggleClasses(bol, [cssData.dwn_pulse_anim], icon)
	// }
	function mutationCallback(mutationList: MutationRecord[]) {
		//https://stackoverflow.com/questions/37168158/javascript-jquery-how-to-trigger-an-event-when-display-none-is-removed#:~:text=11-,Here%20we%20go,-var%20blocker%20%20%3D%20document
		// observers for computed styles... -it needs to be a thing... 🙃
		mutationList.forEach(function (record) {
			if (record.attributeName !== 'style') {
				return
			}

			const { newValue, displayWas, el } = StyleQuery(
				record,
				previousValue
			)

			if (newValue) {
				if (displayWas('flex')) {
					ResetWrappers(mainDDM)
				}

				previousValue = el.style.display
			}
		})
	}
	display(initialDisplay)
	return <const>{ mutationCallback, tryClose, open, close }
}
function StyleQuery(record: MutationRecord, previousValue: string) {
	const el = record.target as HTMLElement
	const currentValue = el.style.display
	const displayWas = (d: s) => previousValue === d && currentValue !== d
	const newValue = currentValue !== previousValue
	return { newValue, displayWas, el }
}

function ResetWrappers(mainDDM: HTMLElement) {
	return mainDDM
		.queryAllasArr('iframe')
		.map(el => el.closest('[data-target]'))
		.filter(el => el != null)
		.forEach(el => {
			el?.removeAttribute('class') // target classes
			el = RemoveAllChildren(el!)
		})
}

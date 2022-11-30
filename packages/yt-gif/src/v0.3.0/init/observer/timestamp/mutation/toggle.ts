import { ChangeElementType, toggleClasses } from '$lib/utils'
import { getOption } from '../../../../lib/backend-frontend/option'
import { cssData } from '../../../config/paths'
import { UIStore } from '$v3/init/config/UIStore'
import { ToggleTimestampShortcuts } from '../shortcut'
import { cleanAndSetUp_TimestampEmulation } from '../emulation/index'
import { timestampObj } from '../types'

//#region 6. Emulate slash menu & timestamps
export async function toggleTimestampEmulation(
	bol: b,
	observer: MutationObserver,
	keyupEventHandler: Function
) {
	if (bol) await RunEmulation()
	else await StopEmulation()

	toggleClasses(
		!bol,
		[`${cssData.dropdown__hidden}`],
		document.querySelector('.dropdown_timestamp-style')!
	)

	async function RunEmulation() {
		await StopEmulation()
		await ToogleTimestampSetUp(true, observer)
		ToggleTimestampShortcuts(
			getOption(UIStore.get().timestamps.tm_options, 'shortcuts')
				.selected,
			keyupEventHandler
		)
	}
	async function StopEmulation() {
		await ToogleTimestampSetUp(false, observer)
		ToggleTimestampShortcuts(false, keyupEventHandler)
	}
}
async function ToogleTimestampSetUp(bol: b, observer: MutationObserver) {
	observer.disconnect()
	const targetNode = document.body

	if (bol) {
		const found = Array<El>()
		found.push(
			...Array.from(
				targetNode.getElementsByClassName(
					timestampObj.start.targetClass
				)
			)
		)
		found.push(
			...Array.from(
				targetNode.getElementsByClassName(timestampObj.end.targetClass)
			)
		)
		await cleanAndSetUp_TimestampEmulation(found)
		observer!.observe(targetNode, {
			childList: true,
			subtree: true,
		})
	} else {
		const foundToRemove = targetNode.queryAllasArr(
			`[${timestampObj.attr.emulation}]`
		)

		for (const tm of foundToRemove) {
			const key = (tm.getAttribute(timestampObj.attr.timestampStyle) ||
				'timestamp') as startEnd | 'timestamp' // I don't know how I feel about this one
			let toReplace = tm.parentElement?.classList.contains(
				'yt-gif-timestamp-parent'
			)
				? tm.parentElement
				: tm // yikes
			toReplace.innerHTML = key
			toReplace = ChangeElementType(toReplace, 'button')
			toReplace.className = timestampObj[key].buttonClass
		}
		// already disconnected
	}
}

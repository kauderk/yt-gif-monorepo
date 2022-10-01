import { cleanAndSetUp_TimestampEmulation } from '../emulation/index'
import { timestampObj } from '../types'

// 6.0 observe added/removed nodes and act accordingly
export async function TimestampBtnsMutation_cb(
	mutationsList: MutationRecord[]
) {
	const found = Array<El>()

	for (const { addedNodes } of mutationsList) {
		Array.from(addedNodes)
			.map(nd => nd as HTMLElement)
			.forEach(el => {
				if (!el.tagName) return // not an element

				if (
					el.classList.contains(timestampObj.start.targetClass) ||
					el.classList.contains(timestampObj.end.targetClass)
				) {
					found.push(el)
				} else if (el.firstElementChild) {
					found.push(
						...Array.from(
							el.getElementsByClassName(
								timestampObj.start.targetClass
							)
						)
					)
					found.push(
						...Array.from(
							el.getElementsByClassName(
								timestampObj.end.targetClass
							)
						)
					)
				}
			})
	}

	await cleanAndSetUp_TimestampEmulation(found)
}

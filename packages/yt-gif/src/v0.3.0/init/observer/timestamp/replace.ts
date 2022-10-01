import { sleep, updateBlock } from '$lib/utils-roam-alpha-api'
import { UI } from '../../config/yt-gif-init'
import { getTimestampObj_smart } from '../../timestamp/formats'
import { getCurrentInputBlock } from '../../../lib/dom/roam'

// 6.3.1
export async function addBlockTimestamp_smart_local(pageRefSufx: startEnd) {
	const timestampObj = await getTimestampObj_smart(pageRefSufx)
	const uid = timestampObj.uid
	const component =
		timestampObj[UI.timestamps.tm_workflow_grab.value as keyof Itime]
			?.fmt ?? ''

	if (!uid)
		return console.warn(
			`YT GIF Timestamps: couldn't find YT GIFs within the Hierarchy: ((${uid}))`
		)
	if (!component)
		return console.warn(
			`YT GIF Timestamps: couldn't find values with the keyword "${UI.timestamps.tm_workflow_grab.value}" from ((${uid}))`
		)

	const { updatedString, el } = concatStringAtCaret(
		getCurrentInputBlock(),
		component
	)

	await updateBlock(uid, updatedString)
	await sleep(50)

	updateAtCaret(getCurrentInputBlock(), el.selectionEnd ?? 0)
}
function updateAtCaret(el: HTMLInputElement, atLength = 0, start = false) {
	if (start) el.selectionStart = el.selectionEnd = atLength
	else el.selectionEnd = el.selectionStart = atLength
	el.focus()
}
function concatStringAtCaret(el: HTMLInputElement, newText: string) {
	const start = el.selectionStart ?? 0
	const end = el.selectionEnd ?? 0
	const text = el.value
	const before = text.substring(0, start)
	const after = text.substring(end, text.length)
	el.value = before + newText + after
	updateAtCaret(el, end + newText.length)

	return <const>{ updatedString: el.value, el }
}

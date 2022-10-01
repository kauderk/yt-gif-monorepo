import { rm_components } from '../../config/driver'

export async function updateSettingsPageBlock(
	input: EventTarget,
	keyObj: string,
	siblingKeys: string[]
) {
	const { type, checked, value } = input as HTMLInputElement
	let replaceWith: string = value.toString() // range - checkbox - radio - label - select

	if (type == 'checkbox' || type == 'radio') {
		replaceWith = checked.toString()
	}
	if (type == 'radio') {
		// special case...
		;[...siblingKeys]
			.map(x => window.YT_GIF_DIRECT_SETTINGS.get(x)!)
			.filter(y => y.inputType == 'radio')
			.forEach(o => o.UpdateSettingsBlockValue('')) // to false
	}
	if (type == 'select-multiple') {
		replaceWith = Array.from((input as HTMLSelectElement).selectedOptions)
			.map(o => o.value)
			.toString()
	}

	await window.YT_GIF_DIRECT_SETTINGS.get(keyObj)?.UpdateSettingsBlockValue?.(
		replaceWith.toString()
	)
}
export async function updateOverrideComponentSettingBlock(el: Element) {
	const validOverride = validOverrideComponentSettingBlock(el)
	if (validOverride) {
		rm_components.assertCurrentKey(validOverride)
		await window.YT_GIF_DIRECT_SETTINGS.get(
			'override_roam_video_component'
		)?.UpdateSettingsBlockValue(validOverride as s)
	}
}
function validOverrideComponentSettingBlock(el: Element) {
	const idPrfx = (key: string) => `deployment_style_${key}`
	let replaceWith: null | s = null // FIXME: use typescript
	switch (el.id) {
		case idPrfx('yt_gif'):
			replaceWith = 'false'
			break
		case idPrfx('video'):
			replaceWith = 'true'
			break
		case idPrfx('both'):
			replaceWith = 'both'
			break
	}
	return replaceWith
}

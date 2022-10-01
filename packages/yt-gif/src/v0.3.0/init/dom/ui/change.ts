import { ObjectKeys, pushSame } from '$lib/utils'
import { UI } from '../../config/yt-gif-init'
import {
	updateOverrideComponentSettingBlock,
	updateSettingsPageBlock,
} from './update'

export function SaveSettingsOnChanges() {
	for (const parentKey of ObjectKeys(UI)) {
		let siblingKeys = Array<string>()
		const parentObj = UI[parentKey]

		for (const childKey of ObjectKeys(parentObj)) {
			const child = parentObj[childKey] as HTMLElement
			siblingKeys = pushSame(siblingKeys, childKey)
			switch (parentKey) {
				//case 'label':
				//case 'InAndOutKeys':
				//case 'referenced':
				case 'defaultPlayerValues':
				case 'defaultValues':
					continue
				case 'deploymentStyle': // special case...
					child.addEventListener(
						'change',
						async function (e: Event) {
							await updateOverrideComponentSettingBlock(
								e.target as El
							)
						},
						true
					)
					continue
				case 'range': // special case...
					child.addEventListener(
						'wheel',
						function () {
							child.dispatchEvent(new Event('change'))
						},
						true
					)
			}
			async function HandleSettingsPageBlockUpdate(e: Event) {
				// e.preventDefault();
				// e.stopPropagation();
				// if(e.target == e.currentTarget)
				return updateSettingsPageBlock(
					e.currentTarget!,
					childKey,
					siblingKeys
				)
			}

			if (!child?.addEventListener) {
				console.log('yt-gif debugger')
				continue
			}
			child.addEventListener(
				'change',
				HandleSettingsPageBlockUpdate,
				true
			)
			child.addEventListener(
				'customChange',
				HandleSettingsPageBlockUpdate,
				true
			)
		}
	}
}

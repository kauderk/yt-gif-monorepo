import { isTrue, ObjectKeys } from '$lib/utils'
import { UI } from '../../config/yt-gif-init'
import CustomSelect from '../../../lib/dom/select/CustomSelect'

//#region 2. filter UI user inputs variables

export function DDM_to_UI_variables() {
	document.queryAllasArr('.select').forEach(fakeSel => {
		if (!fakeSel) return

		const { select, originalSelect } = new CustomSelect({
			fakeSel: <HTMLSelectElement>fakeSel,
		})._output() // damn

		const attrs = Array.from(originalSelect.attributes).map(a => ({
			name: a.name,
			value: a.value,
		}))
		const ignore = ['class', 'multiple']

		for (const { name, value } of attrs) {
			if (ignore.includes(name)) continue
			select.setAttribute(name, value)
			originalSelect.removeAttribute(name)
		}
	})

	for (const parentKey of ObjectKeys(UI)) {
		const parentObj = UI[parentKey]
		//@ts-ignore // FIXME:
		if (parentObj.baseKey?.inputType == 'prompt') {
			delete UI[parentKey]
			continue
		}

		for (const childKey of ObjectKeys(parentObj)) {
			const child = parentObj[childKey]
			//@ts-ignore // FIXME:
			const directObjPpts = child?.baseKey ? child.baseKey : child
			const sessionValue = directObjPpts.sessionValue

			const getEl = <T extends HTMLElement>(): T =>
				document.getElementById(childKey) as T
			const domEl = getEl<HTMLElement>() // ❗❗❗

			if (domEl) {
				//@ts-ignore // FIXME:
				parentObj[childKey] = domEl
				const input = getEl<HTMLInputElement>() // wtf

				switch (parentKey) {
					case 'range':
						input.value = sessionValue
						break
					//@ts-ignore // FIXME:
					case 'label':
						domEl.textContent = sessionValue
						break
					default:
						if (domEl.tagName == 'SELECT') {
							// wtf!!!!!
							const sesionOptions = sessionValue
								.toString()
								.split(',')
								//@ts-ignore // FIXME:
								.filter(s => !!s)

							const selc = getEl<HTMLSelectElement>() // wtf

							Array.from(selc.options).forEach(o => {
								const selected = sesionOptions.includes(o.value)
								o.selected = selected
								if (selected && selc.type == 'select-one')
									selc.value = o.value
								o['customSelect']?.(o.selected) // Hmmmmm
							})
						} // checkbox
						else {
							input.checked = isTrue(sessionValue)
						}

						domEl.previousElementSibling?.setAttribute(
							'for',
							childKey
						)
				}
			} else {
				if (directObjPpts.hasOwnProperty('baseValue')) {
					//@ts-ignore // FIXME:
					parentObj[childKey] =
						sessionValue || directObjPpts.baseValue
				} else if (
					childKey == 'baseKey' ||
					directObjPpts.inputType == 'prompt'
				) {
					delete parentObj[childKey]
				}
			}
		}
	}
}

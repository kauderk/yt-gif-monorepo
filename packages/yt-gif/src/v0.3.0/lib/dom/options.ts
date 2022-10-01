import type { ICustomChangeEvent } from '$v3/lib/dom/select/CustomSelect'
export function addCustomChangeListener(
	option: HTMLOptionElement,
	cb: (e: ICustomChangeEvent) => void
) {
	option.addEventListener('customChange', cb as EventListener)
}

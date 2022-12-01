import type { ICustomChangeEvent } from '$v3/lib/dom/select/CustomSelect'
export function addCustomChangeListener(
	{ addEventListener }: any,
	cb: (e: ICustomChangeEvent) => void
) {
	addEventListener('customChange', cb as EventListener)
}

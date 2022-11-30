import type {
	ProxySelect,
	ProxyCustomSelect,
} from '$v3/init/config/UIStore/types'

type Proxy = ProxySelect | ProxyCustomSelect

/* ********************* */
export function isSelected<P extends Proxy>(select: P, ...value: P['value'][]) {
	// FIXME: this line is the only thing that matters, these types create too much clutter
	const option = Array.from(select.selectedOptions).find(o =>
		value.includes(o.value)
	)

	return option as P['options'][number] | undefined
}
export function getOption<P extends Proxy>(select: P, value: P['value']) {
	// FIXME: this line is the only thing that matters, these types create too much clutter
	const option = Array.from(select.options).find(o => o.value == value)
	if (!option) {
		throw new Error(`SelectProxy'Option is undefined, ${value}`)
	}

	return option as P['options'][number]
}

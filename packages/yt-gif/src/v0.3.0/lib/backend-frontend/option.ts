import type {
	SelectProxy,
	CustomSelectProxy,
} from '$v3/init/config/UIStore/proxy'

type Proxy<S extends string> = CustomSelectProxy<S> | SelectProxy<S>

/* ********************* */
export function isSelected<P extends Proxy<string>>(
	select: P,
	...value: P['value'][]
) {
	// FIXME: this line is the only thing that matters, these types create too much clutter
	const option = Array.from(select.selectedOptions).find(o =>
		value.includes(o.value)
	)

	return option as P['options'][number] | undefined
}
export function getOption<P extends Proxy<string>>(
	select: P,
	value: P['value']
) {
	// FIXME: this line is the only thing that matters, these types create too much clutter
	const option = Array.from(select.options).find(o => o.value == value)
	if (!option) {
		throw new Error(`SelectProxy'Option is undefined, ${value}`)
	}

	return option as P['options'][number]
}

/* ********************* */
export function isSelected(select: HTMLSelectElement, ...value: string[]) {
	return Array.from(select.selectedOptions).find(o =>
		value.includes(o.value)
	) as HTMLOptionElement
}
export function getOption(select: HTMLSelectElement, value: string) {
	return Array.from(select.options).find(
		o => o.value == value
	) as HTMLOptionElement
}

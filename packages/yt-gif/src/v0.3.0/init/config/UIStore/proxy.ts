import type { S } from '.svelte-kit/types/src/sveltekit-zero-api'
import type { OptionProxy, SELProxy, Lookup } from './types'

type cb = (this: SELProxy, payload: CustomEvent<SELProxy>) => void
export function PubSub() {
	return {
		dispatchEvent(event: CustomEvent<any>) {
			console.trace('dispatchEvent')
		},
		addEventListener(eventName: s, cb: cb) {
			console.trace('addEventListener')
		},
		removeEventListener(eventName: s, cb: cb) {
			console.trace('removeEventListener')
		},
	}
}
export function createInputStore() {
	return {
		value: '',
		checked: false,
		...PubSub(),
	}
}
export function createOptionStore<S extends string>(value: S) {
	return {
		value,
		selected: true,
		disabled: false,
		...PubSub(),
	}
}
type attrs = 'multiple' | 'custom'
function Attributes(attributes: attrs[] = []) {
	return {
		attributes,
		hasAttribute(s: attrs) {
			attributes.includes(s)
		},
	}
}
export function createSelectStore<L extends Lookup>(lookup: L) {
	const keys = Object.keys(lookup.options)
	const isSelected = (k: s) => lookup.options[k].selected
	const value = keys.reduce((prev, crr) => {
		return isSelected(crr) ? crr : prev
	}, '')
	return {
		value,
		options: keys.filter(isSelected).map(createOptionStore),
		selectedOptions: new Array<OptionProxy>(),
		//
		...PubSub(),
	}
}
export function createCustomSelectStore<L extends Lookup>(
	lookup: L,
	attributes: attrs[]
) {
	const store = createSelectStore(lookup)
	const newStore = Object.assign(store, Attributes(attributes))

	return {
		...newStore,
		options: Object.values(newStore.options).map(o => ({
			...o,
			customSelect: (bol: boolean) => {},
			...Attributes(attributes),
		})),
	}
}

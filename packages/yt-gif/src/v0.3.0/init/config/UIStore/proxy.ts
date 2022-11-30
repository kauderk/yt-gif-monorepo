import type { OptionProxy, SELProxy } from './types'

type cb = (this: SELProxy, payload: CustomEvent<SELProxy>) => void
export function PubSub() {
	return {
		dispatchEvent(event: CustomEvent<any>) {},
		addEventListener(eventName: s, cb: cb) {},
		removeEventListener(eventName: s, cb: cb) {},
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
		selected: false,
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
export function createSelectStore<S extends string>(options: S[]) {
	return {
		value: <typeof options[number]>{},
		options: options.map(s => createOptionStore(s)),
		selectedOptions: new Array<OptionProxy>(),
		//
		...PubSub(),
	}
}
export function createCustomSelectStore<S extends string>(
	options: S[],
	attributes: attrs[]
) {
	const store = createSelectStore(options)
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

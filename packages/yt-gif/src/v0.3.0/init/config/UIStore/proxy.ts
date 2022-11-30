function PubSub() {
	return {
		dispatchEvent(event: Event) {},
		addEventListener(eventName: s, callback: Function) {},
		removeEventListener(eventName: s, callback: Function) {},
	}
}
export function createInputStore() {
	return {
		value: '',
		checked: false,
		...PubSub(),
	}
}
function createOptionStore<S extends string>(value: S) {
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

export type SelectProxy<S extends string> = ReturnType<
	typeof createSelectStore<S>
>
export type CustomSelectProxy<S extends string> = ReturnType<
	typeof createCustomSelectStore<S>
>
export type InputProxy = ReturnType<typeof createInputStore>
export type OptionProxy = ReturnType<typeof createOptionStore>
export type PubSubProxy = ReturnType<typeof PubSub>

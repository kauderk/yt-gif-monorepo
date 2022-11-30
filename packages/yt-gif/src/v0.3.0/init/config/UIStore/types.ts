import type {
	createSelectStore,
	createCustomSelectStore,
	createInputStore,
	createOptionStore,
	PubSub,
} from './proxy'

export type SelectProxy<S extends string> = ReturnType<
	typeof createSelectStore<S>
>
export type CustomSelectProxy<S extends string> = ReturnType<
	typeof createCustomSelectStore<S>
>
export type InputProxy = ReturnType<typeof createInputStore>
export type OptionProxy = ReturnType<typeof createOptionStore>
export type PubSubProxy = ReturnType<typeof PubSub>

//
export type SELProxy = SelectProxy<string>
export type ProxyCustomSelect = CustomSelectProxy<string>

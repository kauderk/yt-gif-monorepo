import type {
	createSelectStore,
	createCustomSelectStore,
	createRangeStore,
	createOptionStore,
	PubSub,
} from './proxy'

export type SelectProxy<S extends Lookup> = ReturnType<
	typeof createSelectStore<S>
>
export type CustomSelectProxy<S extends Lookup> = ReturnType<
	typeof createCustomSelectStore<S>
>
export type InputProxy = ReturnType<typeof createRangeStore>
export type OptionProxy = ReturnType<typeof createOptionStore>
export type PubSubProxy = ReturnType<typeof PubSub>

//
export type SELProxy = SelectProxy<Lookup>
export type ProxyCustomSelect = CustomSelectProxy<Lookup>

//
type LookupModule = typeof import('./lookups')
export type LookupModules = LookupModule[keyof LookupModule]

export interface Lookup {
	options: {
		[key: string]: {
			selected?: boolean
		}
	}
}
type DeepReadonly<TObj> = {
	readonly [key in keyof TObj]: TObj[key] extends object
		? DeepReadonly<TObj[key]>
		: TObj[key]
}

export type ReadLookup = DeepReadonly<Lookup>

//
type InputModule = typeof import('./inputs')
export type InputModules = InputModule[keyof InputModule]

export interface Inputs {
	value: boolean | number
}

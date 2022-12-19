import type { DeepPartial } from '$lib/types/utilities'

export function recursiveAssign<T extends object>(a: T, b: DeepPartial<T>) {
	if (Object(b) !== b) return b
	if (Object(a) !== a) a = <T>{}
	for (let key in b) {
		// @ts-ignore
		a[key] = recursiveAssign(a[key], b[key])
	}
	return a
}

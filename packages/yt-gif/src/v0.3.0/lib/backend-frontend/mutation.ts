import { isNotZoomPath } from '$lib/utils'

export async function Mutation_cb_raw_rm_cmpts(
	mutationsList: MutationRecord[],
	targetClass: string,
	onRenderedCmpt_cb: (cmpt: HTMLElement) => void
) {
	const found: HTMLElement[] = []

	for (const { addedNodes } of mutationsList) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		for (const node of Array.from(<HTMLScriptElement[]>(<any>addedNodes))) {
			if (!node.tagName) continue // not an element

			if (node.classList.contains(targetClass)) found.push(node)
			else if (node.firstElementChild)
				// @ts-ignore it's not worth it to typecast this
				found.push(...node.getElementsByClassName(targetClass))
		}
	}

	for (const node of found) if (isNotZoomPath(node)) onRenderedCmpt_cb(node)
}

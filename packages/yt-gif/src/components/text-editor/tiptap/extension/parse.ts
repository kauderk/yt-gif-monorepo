import type { drawflowSvelteNodeProps } from '$cmp/drawflow/cmp/blocks'
import type { TItemCtx } from '$cmp/drawflow/cmp/ctx'
import { getComponentExtensions } from './create'

export const tryAttributeToProps = (stringifyProps: string) => {
	let props: drawflowSvelteNodeProps
	try {
		props = JSON.parse(stringifyProps)
	} catch (error) {
		console.error(
			`TIPTAP NodeViewWrapper: Invalid props "${stringifyProps}". Should be a stringify json object`
		)
		props = {}
	}
	return props
}
export const tryPropsToAttribute = (propsObject: drawflowSvelteNodeProps) => {
	let props: s
	try {
		props = JSON.stringify(propsObject)
	} catch (error) {
		console.error(
			`TIPTAP NodeViewWrapper: Invalid props "${propsObject}". Should be a json object`
		)
		props = '{}'
	}
	return props
}

export const createTiptapContent = (
	GraphNodeID: TItemCtx['GraphNodeID'],
	propsObject: drawflowSvelteNodeProps
) => {
	const localExtension = getComponentExtensions().find(
		o => o.Slot.GraphNodeID == GraphNodeID
	)!
	const { tag } = localExtension
	const props = tryPropsToAttribute(propsObject)
	//FIXME: I'm unable to create a string that follows the DOM attribute conventions
	// actually when tiptap passes the this function return value to the editor, it confuses itself
	// it crops the content whenever it encounters a " or '
	const el = document.createElement(tag)
	el.setAttribute('props', props)
	// prettier-ignore
	return el.outerHTML as `<svelte-tiptap-tag props="${ReturnType<typeof tryPropsToAttribute>}"></svelte-tiptap-tag><p></p>`
}

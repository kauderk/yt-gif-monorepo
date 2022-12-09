import { items } from '$cmp/drawflow/cmp/ctx'
import { Node, mergeAttributes } from '@tiptap/core'
import { SvelteNodeViewRenderer } from 'svelte-tiptap'

import TipTapExtensionWrapper from './Wrapper.svelte'

const dashed = (camel: s) => camel.replace(/[A-Z]/g, m => '-' + m.toLowerCase())
export const getComponentExtensions = () =>
	Object.values(items).map(o => {
		const tag = 'svelte-' + dashed(o.GraphNodeID)
		const name = 'svelte' + o.GraphNodeID
		const tipTapNode = Node.create({
			name,
			group: 'block',
			atom: true,
			draggable: true, // Optional: to make the node draggable
			inline: false,

			addAttributes() {
				const keyDefault = Object.entries(o).reduce((acc, crr) => {
					return {
						...acc,
						[crr[0]]: { default: crr[1] },
					}
				}, {})
				return {
					...keyDefault,
					count: { default: 0 },
				}
			},

			parseHTML() {
				return [{ tag }]
			},

			renderHTML({ HTMLAttributes }) {
				return [tag, mergeAttributes(HTMLAttributes)]
			},

			addNodeView() {
				return SvelteNodeViewRenderer(TipTapExtensionWrapper)
			},
		})
		return {
			tipTapNode,
			tag,
			name,
			Slot: o,
		}
	})

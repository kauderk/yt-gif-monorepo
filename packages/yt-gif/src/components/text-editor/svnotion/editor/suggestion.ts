import type { getComponentExtensions } from '$cmp/text-editor/tiptap/extension/create'
import type { createStore } from '../stores'

export const createSuggestion = (
	store: ReturnType<typeof createStore>,
	localExtension: ReturnType<typeof getComponentExtensions>
) => ({
	items: ({ query }: any) => {
		const localExtensionSuggestions = localExtension.map(block => ({
			title: block.Slot.title,
			subtitle: `Create a ${block.Slot.title} (Enhanced YouTube video Player)`,
			command: ({ editor, range }: any) => {
				editor.commands.deleteRange(range)
				// rely on the default attributes
				editor.commands.insertContent(
					`<${block.tag}></${block.tag}><p></p>`
				)
			},
		}))
		return [
			...localExtensionSuggestions,
			{
				title: 'To Dos',
				subtitle: 'Create a to do list with checkboxes',
				command: ({ editor, range }: any) => {
					editor.commands.deleteRange(range)
					editor.commands.insertContent(
						'<ul data-type="taskList"><li data-checked="false"><li>&#8203</li></ul>'
					)
				},
			},
			{
				title: 'Heading 1',
				subtitle: 'BIG heading',
				command: ({ editor, range }: any) => {
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setNode('heading', { level: 1 })
						.run()
				},
			},
			{
				title: 'Heading 2',
				subtitle: 'Less Big heading',
				command: ({ editor, range }: any) => {
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setNode('heading', { level: 2 })
						.run()
				},
			},
			{
				title: 'Heading 3',
				subtitle: 'Medium big heading',
				command: ({ editor, range }: any) => {
					editor
						.chain()
						.focus()
						.deleteRange(range)
						.setNode('heading', { level: 3 })
						.run()
				},
			},
			{
				title: 'Bullet List',
				subtitle: 'Pew pew pew',
				command: ({ editor, range }: any) => {
					editor.commands.deleteRange(range)
					editor.commands.toggleBulletList()
				},
			},
			{
				title: 'Numbered List',
				subtitle: '1, 2, 3, 4...',
				command: ({ editor, range }: any) => {
					editor.commands.deleteRange(range)

					editor.commands.toggleOrderedList()
				},
			},
		]
			.filter(item =>
				item.title.toLowerCase().startsWith(query.toLowerCase())
			)
			.slice(0, 10)
	},

	render: () => {
		return {
			onStart(props: any) {
				let editor = props.editor
				let range = props.range
				let location = props.clientRect()
				store.slashProps.set({ editor, range })
				store.slashVisible.set(true)
				store.slashLocaltion.set({
					x: location.x,
					y: location.y,
					height: location.height,
				})
				store.slashItems.set(props.items)
			},

			onUpdate(props: any) {
				store.slashItems.set(props.items)
			},

			onKeyDown(props: any) {
				if (props.event.key === 'Escape') {
					store.slashVisible.set(false)
					return true
				}
			},

			onExit() {
				store.slashVisible.set(false)
			},
		}
	},
})

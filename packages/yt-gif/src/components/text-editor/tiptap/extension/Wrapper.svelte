<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core'
	import cx from 'classnames'
	import { draggable, NodeViewWrapper } from 'svelte-tiptap'

	import SvelteQueryProvider from '$lib/api/svelte-query/SvelteQueryProvider.svelte'
	import type { TDrawflowBlocks } from '$cmp/drawflow/cmp/blocks'
	import { items } from '$cmp/drawflow/cmp/ctx'
	import { tryAttributeToProps } from './parse'

	export let node: NodeViewProps['node']
	export let updateAttributes: NodeViewProps['updateAttributes']
	export let selected: NodeViewProps['selected'] = false

	const Slot = items.find(
		o => o.GraphNodeID == node.attrs.GraphNodeID
	) as TDrawflowBlocks

	const props = tryAttributeToProps(node.attrs.props)
</script>

<NodeViewWrapper
	class={cx('svelte-component', { selected })}
	action={draggable}>
	<!-- https://github.com/sveltejs/svelte/issues/6037#issuecomment-789286616 -->
	<!-- https://svelte.dev/repl/f9cc573c14a943098f68964dc5496fd7?version=3.31.2 -->
	<div class="tiptap-extension-wrapper">
		<SvelteQueryProvider async={Slot.provider}>
			<svelte:component this={Slot.cmp} {...props} />
		</SvelteQueryProvider>
	</div>
</NodeViewWrapper>

<style>
	div {
		max-width: 500px;
	}
</style>

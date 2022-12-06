<script lang="ts">
	import type { NodeViewProps } from '@tiptap/core'
	import cx from 'classnames'
	import { NodeViewWrapper } from 'svelte-tiptap'
	import Player from '$cmp/drawflow/cmp/blocks/YTGIF.svelte'

	export let node: NodeViewProps['node']
	export let updateAttributes: NodeViewProps['updateAttributes']
	export let selected: NodeViewProps['selected'] = false

	const handleClick = () => {
		updateAttributes({ count: node.attrs.count + 1 })
	}
</script>

<NodeViewWrapper class={cx('svelte-component', { selected })}>
	<div>
		<Player />
	</div>
</NodeViewWrapper>

<style>
	div {
		max-width: 500px;
	}
</style>

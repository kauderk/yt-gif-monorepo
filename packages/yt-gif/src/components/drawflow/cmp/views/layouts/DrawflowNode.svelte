<script lang="ts">
	import Tab from './Tab.svelte'
	let layout = 'layout-a'

	import Modal from './Modal.svelte'
	import {
		nodeTransition,
		receive,
		send,
	} from '$cmp/drawflow/plugins/add-node-svelte/transition'
	import { items } from '../../ctx'

	$: item = items.find(ao => ao.GraphNodeID == $nodeTransition.GraphNodeID)
</script>

<Modal
	isOpen={$nodeTransition.state == 'modal'}
	on:close={() =>
		($nodeTransition = { ...$nodeTransition, id: null, state: 'idle' })}>
	<div
		style="width: auto;
	aspect-ratio: 1 / 1;
	position: inherit;">
		<!-- topbar -->
		<div class="flex justify-center">
			<div class="layout tabs block">
				<Tab value="layout-a" bind:layout>Flex</Tab>
				<Tab value="layout-b" bind:layout>Float</Tab>
				<Tab value="layout-c" bind:layout>Grid</Tab>
			</div>
		</div>
		<br />

		<div class="container">
			<main class="layout-a">
				<h1>Layout</h1>
				<div class="s-portald">
					{#if $nodeTransition.id && $nodeTransition.state == 'modal'}
						<div
							class="s-portald"
							in:receive={{ key: $nodeTransition.prev }}
							out:send={{ key: $nodeTransition.prev }}>
							{#if item}
								<svelte:component this={item.cmp} />
							{/if}
							<slot />
						</div>
					{/if}
				</div>
			</main>
		</div>
	</div>
</Modal>

<style lang="scss">
	:global(body) {
		padding: 0;
	}
	.layout {
		padding: 8px;
	}
	.container {
		position: absolute;
		width: 100%;
		> main {
			padding: 0.5em;
			> div {
				height: auto;
			}
		}
	}
</style>

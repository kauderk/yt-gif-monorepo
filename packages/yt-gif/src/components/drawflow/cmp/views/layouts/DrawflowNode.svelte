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
	.s-portal {
		position: fixed;
		z-index: 1000000000;
		width: 500px;
		aspect-ratio: 1 / 1;
		background-color: rgba(128, 128, 128, 0.158);
		backdrop-filter: blur(2px);
	}
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
	.layout-a {
		display: flex;
	}

	.layout-a .a,
	.layout-a .b,
	.layout-a .c {
		flex: 1;
		font-size: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.layout-a .a {
		color: white;
		font-size: 12px;
		display: block;
		padding: 4px;
	}
	.b {
		background: green;
	}
	.c {
		background: blue;
	}
	.d {
		background: red;
	}
	.layout-b .b {
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin: 0.5em;
	}
	.layout-b .c {
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin: 0.5em;
	}

	.layout-c {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}
	.layout-c .b,
	.layout-c .c,
	.layout-c .d {
		color: white;
	}
</style>

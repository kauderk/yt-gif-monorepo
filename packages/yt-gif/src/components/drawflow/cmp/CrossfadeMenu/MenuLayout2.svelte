<!-- {/key} -->
<script lang="ts">
	import { flip } from 'svelte/animate'
	import { type TItem, getContext, defCrossfade } from './store'
	import Item from './Item.svelte'

	const items = getContext()
	export let opened: TItem
	export let [send, receive] = defCrossfade
</script>

<!-- {#key opened.id} -->
{#each [opened] as _ (opened.id)}
	<div class="layout-2">
		<div class="menu">
			{#each items.filter( ({ id }) => (opened ? opened.id !== id : true) ) as item (item.id)}
				<div
					class="item"
					in:receive={{ key: item.id }}
					out:send={{ key: item.id }}
					animate:flip>
					<Item
						hue={item.id * 35}
						icon={item.icon}
						cmp={item.cmp}
						on:click={() => (opened = item)} />
				</div>
			{/each}
		</div>
		<div class="content">
			<div
				class="item"
				in:receive={{ key: opened.id }}
				out:send={{ key: opened.id }}>
				<Item
					hue={opened.id * 35}
					icon={opened.icon}
					expanded
					cmp={opened.cmp}
					on:click>
					{opened.title}
				</Item>
			</div>
		</div>
	</div>
{/each}

<style lang="scss">
	.layout-2 {
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: start;
		padding: 0.5rem;
		> .menu > .item:not(:last-child) {
			margin-bottom: 0.5rem;
		}

		> .content {
			flex-grow: 1;
			padding-left: 0.5rem;
			> .item {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>

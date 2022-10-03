<script lang="ts">
	import { slide } from 'svelte/transition'
	import MenuItem from './MenuItem.svelte'
	import Drops from './Drops.svelte'
	import Swipe from './Swipe.svelte'

	import { ddm_bg } from 'src/styles/roam-classes'
	import { mdiYoutubeStudio, mdiChevronRight, mdiArrowLeft } from '@mdi/js'

	let v = false
	$: offsetHeight = 0
	$: height = offsetHeight <= 0 ? '0%' : offsetHeight + 'px'
</script>

<Drops let:active let:go let:drops let:leaveOthers>
	<!-- expand vertically -->
	<div
		data-swipe-container
		class="relative"
		transition:slide={{ duration: 300 }}
		on:introstart={() => (v = false)}
		on:introend={() => (v = true)}
	>
		<!-- switch between percentage and pixel in height -->
		<div class={'expandable ' + ddm_bg} style="height: {height}">
			<!-- swipe left to right: menu items  -->
			{#if active === 'main'}
				<Swipe bind:offsetHeight {v} x={-1}>
					{#each drops as { key, visit, icon = mdiYoutubeStudio }}
						<MenuItem
							{visit}
							go={() => leaveOthers(key) || go(key)}
							leftIcon={icon}
							rightIcon={mdiChevronRight}>{key}</MenuItem
						>
					{/each}
				</Swipe>
			{/if}
			<!-- swipe right to left: containers -->
			{#each drops as { key, Sub, type = 'sub-ddm' }}
				{#if active == key}
					<Swipe bind:offsetHeight {v} clazz="{type}-ddm">
						<div class="self-center">
							<MenuItem {go} leftIcon={mdiArrowLeft}>Back</MenuItem>
						</div>
						<svelte:component this={Sub} />
					</Swipe>
				{/if}
			{/each}
		</div>
	</div>
</Drops>

<style lang="scss">
	.expandable {
		box-sizing: content-box;
		transition: height 0.2s;

		// top center
		display: flex;
		justify-content: center;
		align-items: flex-start;

		min-width: 18.5em !important;

		// hide swipes
		position: relative;
		overflow: hidden;

		:global(*) {
			user-select: none;
		}
	}
</style>

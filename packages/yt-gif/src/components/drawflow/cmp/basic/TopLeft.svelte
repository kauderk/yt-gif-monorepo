<div class="top-view">
	<!-- https://github.com/sveltejs/svelte/issues/4079 
			<script lang="ts">
				import { toggleActiveView, state } from './store'
			</script>
			<slot {toggleActiveView} {state} />
		-->
	<slot />
</div>

<style lang="scss">
	@use './style.scss';
	.top-view {
		display: flex;
		height: 6%;
		top: 0;
		overflow-y: hidden;
		justify-content: center;
		align-items: center;
	}
</style>

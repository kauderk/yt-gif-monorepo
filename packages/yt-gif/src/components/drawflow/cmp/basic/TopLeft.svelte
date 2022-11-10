<div class="top-view">
	<div id="view-section">
		<!-- https://github.com/sveltejs/svelte/issues/4079 
			<script lang="ts">
				import { openCloseSidebar, state } from './store'
			</script>
			<slot {openCloseSidebar} {state} />
		-->
		<slot />
	</div>
</div>

<style lang="scss">
	@use './style.scss';
	.top-view {
		display: flex;
		height: 5%;
		top: 0;
		overflow-y: hidden;
		#view-section {
			background: rgba(50, 50, 50, 0.2);
			backdrop-filter: blur(3px);
			border: 1px solid rgba(255, 255, 255, 0.1);
			border-radius: 0.3rem;
			display: flex;
			align-items: center;
			justify-content: space-around;
			gap: 0.5rem;
			padding: 0.1em 0.5em;
		}
	}
</style>

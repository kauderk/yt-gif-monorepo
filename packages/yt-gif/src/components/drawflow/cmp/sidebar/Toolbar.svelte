<script lang="ts">
	import { openCloseSidebar, state } from '../basic/store'
	import TopLeft from '../basic/TopLeft.svelte'
</script>

<svelte:component this={TopLeft}>
	<label for="none">View</label>
	<button
		type="button"
		class="example-button short"
		on:click={openCloseSidebar}>
		{#if $state == 'left-sidebar'}
			<i class="fa-solid fa-sidebar" />
		{:else}
			<i class="fa-light fa-diagram-project" />
		{/if}
	</button>
</svelte:component>

<style lang="scss">
	@media (max-width: 500px) {
		.example-button > i {
			height: 1.5rem;
			font-size: 1rem;
			line-height: 1.5rem;
			width: 1.5rem;
		}

		button {
			width: 100%;
		}
	}
	//
	label {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
	}
	.example-button {
		background: rgba(255, 255, 255, 0.05) !important;
		border: 1px solid transparent;
		border-radius: 0.3rem;
		color: rgb(var(--theme-color));
		flex-grow: 1;
		outline: none;

		border-color: rgba(0, 208, 250, 0.35) !important;
		box-shadow: rgba(0, 208, 250, 0.35) 0px 0px 3px inset;
		cursor: pointer;

		//////////
		border-color: rgba(58, 241, 238, 0.3) !important;
		box-shadow: rgba(58, 241, 238, 0.3) 0px 0px 3px inset;
		&:hover {
			border-color: rgb(58, 241, 238) !important;
			box-shadow: rgb(58, 241, 238) 0px 0px 20px inset;
		}

		&.short {
		}

		&.short {
			color: white;
		}

		&:hover,
		&:focus {
			border: 1px solid rgb(var(--theme-color));
		}

		&:hover {
			border-color: rgb(0, 208, 250) !important;
			box-shadow: rgb(0, 208, 250) 0px 0px 20px inset;
		}

		& > i {
			height: 2rem;
			font-size: 1.25rem;
			line-height: 2rem;
			width: 2rem;
		}
	}
</style>

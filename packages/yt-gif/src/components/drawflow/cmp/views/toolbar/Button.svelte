<script lang="ts">
	import { state, toggleActiveView } from '../../basic/store'

	export let active: typeof $state['active']
	export let on: string
	export let off = on
	$: selected = $state.active == active
</script>

<button
	type="button"
	class="short"
	class:selected
	id={active}
	on:click={toggleActiveView(active)}>
	{#if selected}
		<i class="fa-solid fa-{on}" />
	{:else}
		<i class="fa-light fa-{off}" />
	{/if}
</button>

<style lang="scss">
	@media (max-width: 500px) {
		button > i {
			height: 1.5rem;
			font-size: 1rem;
			line-height: 1.5rem;
			width: 1.5rem;
		}

		button {
			width: 100%;
		}
	}

	button {
		background: rgba(255, 255, 255, 0.05) !important;
		border: 1px solid transparent;
		border-radius: 0.3rem;
		color: rgb(var(--theme-color));
		flex-grow: 1;
		outline: none;

		cursor: pointer;

		&.selected {
			border-color: rgba(58, 241, 238, 0.3) !important;
		}
		box-shadow: rgba(58, 241, 238, 0.3) 0px 0px 3px inset;

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

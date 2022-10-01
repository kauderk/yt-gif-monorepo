<script>
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let selected = false
	export let disabled = false

	const onClick = () => dispatch('change', (selected = !selected))
</script>

<span
	class="rounded-5 bp3-menu-item text-color-200"
	class:selected
	class:disabled
	on:click={onClick}>
	<slot />
</span>

<style lang="scss">
	span {
		width: max-content;
		height: max-content;

		padding: 0px 2px;
		border: 1px solid var(--ddm-400);

		font-weight: bold;
	}

	.selected {
		color: var(--ddm-200);
		border-color: var(--ddm-300);
		background: var(--ddm-400);
	}
	.disabled {
		color: var(--ddm-400);
		border-color: var(--ddm-400);
		background: transparent;
		cursor: not-allowed;
	}
</style>

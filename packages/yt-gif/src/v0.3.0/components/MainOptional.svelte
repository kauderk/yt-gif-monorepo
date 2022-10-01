<script lang="ts">
	export let id: s // = 'main'

	export let tooltip: StrSearch = undefined
	export let placement: StrSearch = undefined
	export let checked: b = false
</script>

<div
	class="hover-bg select-none"
	data-tooltip={tooltip}
	data-tooltip-conf={placement}>
	<label class="m-2" for={id}><slot /></label>
	<input
		class="m-2"
		type="checkbox"
		{id}
		tabindex="-1"
		bind:checked
		on:change />
</div>

<style lang="scss">
	label {
		color: var(--ddm-100);
		&:active {
			color: var(--ddm-50);
		}
	}
	input[type='checkbox'] {
		opacity: 0.8;
		accent-color: var(--ddm-s-300);
		margin-left: 0.2em;
		margin-right: 0.2em;
	}
	div {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		border: 1px solid var(--ddm-700);
		border-radius: 10px;
	}
</style>

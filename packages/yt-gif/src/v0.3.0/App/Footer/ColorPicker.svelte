<script lang="ts">
	export let name: s
	export let color: s

	const id = 'html5colorpicker' + name
</script>

<div>
	<label class="text-color-200" for={id}>{name} :</label>
	<input
		class="text-color-200"
		type="color"
		{id}
		bind:value={color}
		on:change />
	<label class="text-color-200" for={id}>{color}</label>
</div>

<style lang="scss">
	div {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}
	label {
		justify-self: end;
		margin: 0;
		text-transform: capitalize;
	}
	input {
		justify-self: center;

		background: var(--ddm-400);
		border-color: var(--ddm-600);

		padding: 0.3em;
		width: 2.1em;
		aspect-ratio: 1 / 1;
	}
	label:last-child {
		justify-self: start;
	}
</style>

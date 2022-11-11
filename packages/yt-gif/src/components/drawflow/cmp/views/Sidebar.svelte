<script lang="ts">
	import Side from '../basic/Side.svelte'

	import CrossfadeMenu from '../CrossfadeMenu/App.svelte'
</script>

<svelte:component this={Side}>
	<div id="example-wrapper">
		<div id="search-section" class="example-section">
			<input type="text" placeholder="Search" class="example-input" />
		</div>

		<div
			id="image-section"
			class="example-section vertical"
			style="align-items: flex-start;">
			<CrossfadeMenu />
			<div id="image-section-rotator">
				<button type="button" class="image-section-dot" />
				<button type="button" class="image-section-dot" />
				<button type="button" class="image-section-dot" />
			</div>
		</div>
	</div>
</svelte:component>

<style lang="scss">
	:root {
		--white: 255, 255, 255;
		--red: 229, 57, 53;
		--orange: 251, 140, 0;
		--yellow: 253, 216, 53;
		--green: 67, 160, 71;
		--blue: 30, 136, 229;
		--indigo: 57, 73, 171;
		--violet: 156, 39, 176;

		--theme-color: var(--white);
	}

	input {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
	}
	#image-section {
		grid-area: 🖼️;
		gap: 1rem;
		height: 500px;
		// if it gets to tight remove the padding
		padding: 0;
	}

	.vertical {
		flex-direction: column;
		height: max-content;
	}

	.example-input {
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid transparent;
		border-radius: 0.25rem;
		color: white;
		outline: none;
		padding: 10px;
		width: 100%;
		&::placeholder {
			color: rgba(var(--theme-color), 0.5);
		}

		&:focus {
			border-color: rgb(var(--theme-color));
		}
	}

	#search-section {
		grid-area: 🔍;
	}
</style>

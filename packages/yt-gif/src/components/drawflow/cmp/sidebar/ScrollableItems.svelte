<div id="side-bar-section" class="example-section">
	<button type="button" class="example-button">
		<i class="fa-solid fa-alien" />
	</button>
	<button type="button" class="example-button">
		<i class="fa-solid fa-cactus" />
	</button>
	<button type="button" class="example-button">
		<i class="fa-solid fa-code" />
	</button>
	<button type="button" class="example-button">
		<i class="fa-solid fa-cat" />
	</button>
	<button type="button" class="example-button">
		<i class="fa-solid fa-blender" />
	</button>
	<button type="button" class="example-button">
		<i class="fa-solid fa-crab" />
	</button>
</div>

<style>
	:root {
		--purple: rgb(69, 39, 160);
		--white: 255, 255, 255;
		--theme-color: var(--white);
	}
	.example-section {
		background: rgba(50, 50, 50, 0.2);
		-webkit-backdrop-filter: blur(3px);
		backdrop-filter: blur(3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 0.5rem;
		padding: 0.5em;
	}

	#side-bar-section {
		grid-area: ⬅️;
	}

	*,
	:before,
	:after {
		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
		border-color: #e5e7eb;
	}

	button {
		font-family: inherit;
		font-size: 100%;
		font-weight: inherit;
		line-height: inherit;
		color: inherit;
		margin: 0;
		padding: 0;
		text-transform: none;
		cursor: pointer;
	}

	button,
	[type='button'] {
		-webkit-appearance: button;
		background-color: transparent;
		background-image: none;
	}

	.example-button {
		background: rgba(255, 255, 255, 0.05) !important;
		border: 1px solid transparent;
		border-radius: 0.3rem;
		color: rgb(var(--theme-color));
		flex-grow: 1;
		outline: none;
		padding: 1.25rem;
		border-color: rgba(0, 208, 250, 0.35) !important;
		box-shadow: rgba(0, 208, 250, 0.35) 0px 0px 3px inset;
		cursor: pointer;
	}

	.example-button:hover {
		border: 1px solid rgb(var(--theme-color));
		border-color: rgb(0, 208, 250) !important;
		box-shadow: rgb(0, 208, 250) 0px 0px 20px inset;
	}

	.example-button > i {
		height: 2rem;
		font-size: 1.25rem;
		line-height: 2rem;
		width: 2rem;
	}
</style>

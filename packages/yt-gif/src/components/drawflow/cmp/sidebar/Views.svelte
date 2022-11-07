<div id="view-section" class="snipcss">
	<label class="" for="none"> View </label>
	<button type="button" class="example-button short ">
		<i class="fa-solid fa-grid-2 " />
	</button>
	<button type="button" class="example-button short ">
		<i class="fa-solid fa-grid " />
	</button>
	<button type="button" class="example-button short ">
		<i class="fa-solid fa-bars " />
	</button>
</div>

<style lang="scss">
	#view-section {
		background-color: rgba(50, 50, 50, 0.2);
		backdrop-filter: blur(3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 0.5rem;
		padding: 1rem;
	}

	#view-section {
		grid-area: 🪟;
	}

	label {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
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

	.example-button {
		background-color: rgba(255, 255, 255, 0.05) !important;
		border: 1px solid transparent;
		border-radius: 0.3rem;
		color: rgb(var(--theme-color));
		flex-grow: 1;
		outline: none;
		padding: 1.25rem;
		cursor: pointer;

		&.short {
			color: white;
			padding: 0.3rem 1.5rem;
		}

		&:hover {
			border: 1px solid rgb(var(--theme-color));
		}

		& > i {
			height: 2rem;
			font-size: 1.25rem;
			line-height: 2rem;
			width: 2rem;
		}
	}
</style>

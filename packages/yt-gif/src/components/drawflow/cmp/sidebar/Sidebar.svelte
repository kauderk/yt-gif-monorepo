<script lang="ts">
	import Side from '../basic/Side.svelte'

	import CrossfadeMenu from '../CrossfadeMenu/App.svelte'
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import ScrollableItems from './ScrollableItems.svelte'
</script>

<svelte:component this={Side}>
	<div id="example-wrapper">
		<div class="action-section section" id="cool">
			<button type="button">
				<i class="fa-regular fa-comment-question" />
				<span>Ask</span>
			</button>
			<button type="button">
				<i class="fa-regular fa-comment-check" />
				<span>Answer</span>
			</button>
			<button type="button">
				<i class="fa-regular fa-comment-lines" />
				<span>Post</span>
			</button>
		</div>
		<div id="search-section" class="example-section">
			<input type="text" placeholder="Search" class="example-input" />
		</div>
		<HorizontalScroller>
			<ScrollableItems />
		</HorizontalScroller>

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
	#cool {
		--font-color: 200, 200, 200;

		display: flex;
		gap: 0.5rem;
		// background: rgb(20 20 20);
		background: rgba(50, 50, 50, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.1);
		padding: 0.5rem;
		border-radius: 0.25rem;

		button {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 0.5rem;
			flex-grow: 1;
			background: rgba(255 255 255 / 5%);
			color: rgb(var(--font-color));
			padding: 0.5rem;
			border: none;
			outline: none;
			border-radius: 0.25rem;
			text-transform: uppercase;
			background-color: rgb(214, 90, 49);
			cursor: pointer;
			& i {
				font-size: 1.2rem;
			}
			& span {
				font-size: 0.75rem;
				font-weight: 500;
				text-transform: uppercase;
			}
			&:hover {
				background: rgba(255 255 255 / 10%);
			}
			&:active {
				background: rgba(255 255 255 / 15%);
			}
			&:hover,
			&:focus {
				/*outline: 1px solid rgb(var(--theme-color));*/
				background-color: rgb(239, 239, 239);
				color: rgb(214, 90, 49);
			}
		}
	}

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

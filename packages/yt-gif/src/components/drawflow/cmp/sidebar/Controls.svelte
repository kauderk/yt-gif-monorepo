<script lang="ts">
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import { fly } from 'svelte/transition'
	import type { TView } from '../types'

	export let state: TView = 'left-sidebar'
	const setState = (to: TView) => (state = to)
</script>

<div class="top-view">
	<div id="view-section" class="example-section">
		<label for="none">View</label>
		<button
			type="button"
			class="example-button short"
			on:click={() => setState('full-graph')}>
			<i class="fa-light fa-diagram-project" />
		</button>
		<button
			type="button"
			class="example-button short"
			on:click={() => setState('full-graph')}>
			<i class="fa-solid fa-gallery-thumbnails" />
		</button>
		<button
			type="button"
			class="example-button short"
			on:click={() => setState('left-sidebar')}>
			<i class="fa-solid fa-sidebar" />
		</button>
	</div>
</div>
{#if state == 'left-sidebar'}
	<div id="left-panel" transition:fly={{ x: -300 }}>
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
			<!--  -->
			<div id="theme-picker-section" class="example-section">
				<input type="radio" name="theme" value="white" checked={true} />
				<input type="radio" name="theme" value="red" />
				<input type="radio" name="theme" value="orange" />
				<input type="radio" name="theme" value="yellow" />
				<input type="radio" name="theme" value="green" />
				<input type="radio" name="theme" value="blue" />
				<input type="radio" name="theme" value="indigo" />
				<input type="radio" name="theme" value="violet" />
			</div>
			<HorizontalScroller>
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
			</HorizontalScroller>

			<div id="search-section" class="example-section">
				<input type="text" placeholder="Search" class="example-input" />
			</div>
			<div id="progress-section" class="example-section">
				<div class="progress-bar">
					<div class="progress-bar-completion" />
				</div>
			</div>
			<div id="image-section" class="example-section vertical">
				<img
					src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
					alt="Nature!" />
				<div id="image-section-rotator">
					<button type="button" class="image-section-dot" />
					<button type="button" class="image-section-dot" />
					<button type="button" class="image-section-dot" />
				</div>
			</div>
			<div id="shape-section" class="example-section">
				<button type="button" class="example-button">
					<i class="fa-solid fa-square" />
				</button>
				<button type="button" class="example-button">
					<i class="fa-solid fa-triangle" />
				</button>
				<button type="button" class="example-button">
					<i class="fa-solid fa-circle" />
				</button>
				<button type="button" class="example-button">
					<i class="fa-solid fa-hexagon" />
				</button>
				<button type="button" class="example-button">
					<i class="fa-solid fa-star" />
				</button>
				<button type="button" class="example-button">
					<i class="fa-solid fa-rhombus" />
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@keyframes bounce {
		from,
		6.66%,
		17.66%,
		33.33% {
			animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
			transform: translate3d(0, 0, 0);
		}

		13.33%,
		14.33% {
			animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			transform: translate3d(0, -30px, 0) scaleY(1.1);
		}

		23.33% {
			animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
			transform: translate3d(0, -15px, 0) scaleY(1.05);
		}

		26.66% {
			transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
			transform: translate3d(0, 0, 0) scaleY(0.95);
		}

		30% {
			transform: translate3d(0, -4px, 0) scaleY(1.02);
		}
	}

	#left-panel,
	.top-view {
		overflow-y: hidden;
		//display: flex;
		position: absolute;
		// top: 0;
		left: 0;
		width: 25rem;
		height: 100%;

		background-color: rgba(38, 38, 38, 0.4);
		padding: 0.5rem;

		// border-right: 1px solid #d65a31;
		backdrop-filter: blur(4px);
		box-shadow: rgba(6, 6, 6, 0.5) 15px 15px 25px;
		z-index: 5;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: auto;
		transition: left 0.5s;
		border-right-color: rgb(146, 61, 34);
		&::-webkit-scrollbar-corner {
			background: transparent;
		}
		&::-webkit-scrollbar-track {
			border-radius: 10px;
			background: rgba(245, 245, 245, 0.356);
		}
		&::-webkit-scrollbar {
			width: 12px;
			//background: rgba(245, 245, 245, 0.356);
			background: transparent;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 10px;
			background: #555;
		}
	}
	.top-view {
		display: flex;
		height: 5%;
		top: 0;
		overflow-y: hidden;
		.example-button.short {
			padding: 0rem 0.5rem;
		}
		.example-button i {
			height: auto;
			font-size: 1rem;
			line-height: inherit;
			width: auto;
		}
	}
	div#view-section {
		padding: 0.1em 0.5em;
	}
	#left-panel {
		height: 95%;
		bottom: 0;
	}
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
				animation: bounce 3s infinite;
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

	input,
	label {
		color: white;
		font-family: 'Rubik', sans-serif;
		font-size: 1em;
	}

	#example-wrapper {
		// margin: 4rem auto;
		// padding: 1rem;

		//margin-bottom: 6rem;
		//width: min(600px, calc(100% - 2rem));
		position: relative;
		z-index: 2;
		display: grid;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		grid-template-areas:
			'🎨 🎨'
			'⬅️ 🔍'
			'⬅️ 🪟'
			'⬅️ 🅿️'
			'⬅️ 🖼️'
			'⬅️ 🔼';
	}

	.example-section {
		background: rgba(50, 50, 50, 0.2);
		backdrop-filter: blur(3px);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.3rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		gap: 0.5rem;
		padding: 0.5em;
	}
	.vertical {
		flex-direction: column;
		height: max-content;
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
		&.short {
			color: white;
			padding: 0.3rem 1.5rem;
		}

		&:hover,
		&:focus {
			border: 1px solid rgb(var(--theme-color));
		}

		&:hover {
			border-color: rgb(0, 208, 250) !important;
			box-shadow: rgb(0, 208, 250) 0px 0px 20px inset;
			animation: bounce 3s infinite;
		}

		& > i {
			height: 2rem;
			font-size: 1.25rem;
			line-height: 2rem;
			width: 2rem;
		}
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

	#theme-picker-section {
		grid-area: 🎨;
		justify-content: space-between;

		& > input {
			height: 1.8rem;
			width: 1.8rem;
			margin: 0px;
			outline: none;
			position: relative;
			cursor: pointer;
		}

		& > input:before,
		& > input:after {
			content: '';
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 100%;
			z-index: 2;
		}

		& > input:after {
			height: 104%;
			width: 104%;
		}

		& > input:before {
			display: none;
			height: 120%;
			width: 120%;
			border: 0.2rem solid white;
		}

		& > input:not(:checked):hover:before,
		& > input:not(:checked):active:before {
			display: block;
			border-color: rgba(255, 255, 255, 0.5);
		}

		& > input:checked:before {
			display: block;
		}

		& > input[value='white']:after {
			background: rgb(255, 255, 255);
		}

		& > input[value='red']:after {
			background: rgb(var(--red));
		}

		& > input[value='orange']:after {
			background: rgb(var(--orange));
		}

		& > input[value='yellow']:after {
			background: rgb(var(--yellow));
		}

		& > input[value='green']:after {
			background: rgb(var(--green));
		}

		& > input[value='blue']:after {
			background: rgb(var(--blue));
		}

		& > input[value='indigo']:after {
			background: rgb(var(--indigo));
		}

		& > input[value='violet']:after {
			background: rgb(var(--violet));
		}
	}

	#side-bar-section {
		grid-area: ⬅️;
	}

	#search-section {
		grid-area: 🔍;
	}

	#view-section {
		grid-area: 🪟;
		& > .example-button {
			border-color: rgba(58, 241, 238, 0.3) !important;
			box-shadow: rgba(58, 241, 238, 0.3) 0px 0px 3px inset;
			&:hover {
				border-color: rgb(58, 241, 238) !important;
				box-shadow: rgb(58, 241, 238) 0px 0px 20px inset;
			}
		}
	}

	#progress-section {
		grid-area: 🅿️;
	}

	.progress-bar {
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 1rem;
		height: 1rem;
		width: 100%;
		.progress-bar-completion {
			background: rgb(var(--theme-color));
			border-radius: inherit;
			height: 100%;
			width: 40%;
		}
	}

	#image-section {
		grid-area: 🖼️;
		gap: 1rem;
		& > img {
			width: 100%;
		}
	}

	#image-section-rotator {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 1rem;

		& > .image-section-dot {
			background: rgba(var(--theme-color), 0.4);
			height: 0.5rem;
			width: 0.5rem;
			margin: 0px;
			padding: 0px;
			border-radius: 100%;
			border: none;
			outline: none;
			&:hover,
			&:focus {
				background: rgba(var(--theme-color), 0.8);
				cursor: pointer;
			}
			&:first-child {
				background: rgb(var(--theme-color));
			}
		}
	}

	#shape-section {
		grid-area: 🔼;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		& > .example-button {
			border: 1px solid rgba(var(--theme-color), 0.4);
			height: 100px;
			border-color: rgba(204, 255, 51, 0.27) !important;
			box-shadow: rgba(204, 255, 51, 0.27) 0px 0px 3px inset;
			&:hover,
			&:focus {
				background: rgba(var(--theme-color), 0.1);
				border-color: rgb(var(--theme-color));
			}
			&:hover {
				border-color: rgb(204, 255, 51) !important;
				box-shadow: rgb(204, 255, 51) 0px 0px 20px inset;
			}
		}
	}

	@media (max-width: 500px) {
		#example-wrapper {
			grid-template-areas:
				'🎨'
				'⬅️'
				'🔍'
				'🪟'
				'🅿️'
				'🖼️'
				'🔼';
			margin-top: 1rem;
		}

		.example-button > i {
			height: 1.5rem;
			font-size: 1rem;
			line-height: 1.5rem;
			width: 1.5rem;
		}

		#theme-picker-section {
			display: grid;
			gap: 1rem;
			grid-template-columns: repeat(4, 1fr);
			justify-items: center;
			& > input {
				height: 1.4rem;
				width: 1.4rem;
			}
		}

		#view-section {
			flex-direction: column;
			& > button {
				width: 100%;
			}
		}

		#side-bar-section {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
		}
	}
</style>

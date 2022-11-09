<script lang="ts">
	import type { TView } from '../types'
	import HorizontalScroller from '$cmp/stand-alone/HorizontalScroller.svelte'
	import SocialMediaPost from '../blocks/SocialMediaPost.svelte'
	import { ScaleToFitParent } from '$cmp/stand-alone/ScaleToFitParent'
	import Player from '../blocks/Player.svelte'
	import Shadow from '../blocks/Shadow.svelte'
	import Tools from '../blocks/Tools.svelte'
	import Video from '../blocks/Video.svelte'
	import SquareTags from '../blocks/SquareTags.svelte'

	import { onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import { nodeBG } from '../../cmp/store'

	export let state: TView = 'left-sidebar'
	const openCloseSidebar = () =>
		(state = state == 'left-sidebar' ? 'full-graph' : 'left-sidebar')
	// prettier-ignore
	const colors = 	[ 'rgba(131, 131, 131, 0.4)', '#7b1d1d', 'rgb(214, 90, 49)', '#dbae00', '#0e6f2f', '#173693', '#4f107d', '#914091' ]
	// prettier-ignore
	const blocks = { SocialMediaPost, Player, Shadow, Tools, Video, SquareTags }
	let block: keyof typeof blocks = 'SocialMediaPost'

	onMount(() => nodeBG.useLocalStorage())

	import { crossfade } from 'svelte/transition'

	const [send, receive] = crossfade({
		duration: 300,
	})
</script>

<svelte:window on:keydown={e => e.key == 'º' && openCloseSidebar()} />

<div class="top-view">
	<div id="view-section" class="example-section">
		<label for="none">View</label>
		<button
			type="button"
			class="example-button short"
			on:click={openCloseSidebar}>
			{#if state == 'left-sidebar'}
				<i class="fa-solid fa-sidebar" />
			{:else}
				<i class="fa-light fa-diagram-project" />
			{/if}
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
				{#each colors as current}
					<input
						type="radio"
						name="theme"
						on:click={() => ($nodeBG = current)}
						style="--accent-color: {current}"
						checked={$nodeBG == current} />
				{/each}
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
				{#if block}
					{#key block}
						<div
							in:receive={{ key: 'block' }}
							out:send={{ key: 'block' }}>
							<svelte:component this={blocks[block]} />
						</div>
					{/key}
				{:else}
					<img
						src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
						alt="Nature!" />
				{/if}
				<div id="image-section-rotator">
					<button type="button" class="image-section-dot" />
					<button type="button" class="image-section-dot" />
					<button type="button" class="image-section-dot" />
				</div>
			</div>
			<div id="shape-section" class="example-section">
				{#each Object.entries(blocks) as [key, cmp]}
					<button
						type="button"
						class="example-button"
						on:click={() => (block = key)}
						use:ScaleToFitParent>
						{#if block != key}
							<div
								in:receive={{ key: 'block' }}
								out:send={{ key: 'block' }}>
								<svelte:component this={cmp} />
							</div>
						{:else}
							<img
								src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW5zfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
								alt="Nature!" />
						{/if}
					</button>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.scaler {
		max-width: 140px;
		height: fit-content;
		position: relative;
		div {
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: red;
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
		& > input {
			accent-color: var(--accent-color, gray);
		}
		& > input:after {
			background: var(--accent-color, gray);
		}
		& > input:checked {
			&:after {
				background: rgba(128, 128, 128, 0.363);
			}
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

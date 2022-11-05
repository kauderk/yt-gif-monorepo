<script lang="ts">
	import Drag from './Drag.svelte'
	import { getContext } from './store'

	const ctx = getContext()

	const dragables = [
		'facebook',
		'slack',
		'github',
		'telegram',
		'aws',
		'log',
		'google',
		'email',
		'template',
		'multiple',
		'personalized',
		'dbclick',
	]
</script>

<div class="absolute">
	<div
		class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full">
		<div
			class="focus:outline-none text-left text-white flex justify-between items-center w-full py-5 space-x-14  ">
			<p class="text-sm leading-5 uppercase">Draggable Templates</p>
			<i class={'fab fa-' + 'slack'} />
		</div>
		<div
			class="flex justify-start flex-col w-full md:w-auto items-start pb-1"
			bind:this={$ctx.templateDragableRoot}>
			{#each dragables as name}
				<Drag {name} drag={$ctx.dnd.drag} />
			{/each}
		</div>
	</div>
	<div
		style="display: none"
		class="col"
		bind:this={$ctx.templateDragableRoot}>
		{#each dragables as name}
			<Drag {name} drag={$ctx.dnd.drag} />
		{/each}
	</div>
</div>

<div id="left-panel" class="snipcss-BHdFa">
	<div class="slider-icon" id="slide-left-panel">
		<div style="margin-top: 1rem">
			<i class="fas fa-arrow-left" />
		</div>
	</div>
	<div class="left-panel-content">
		<div id="add-variables" class="left-panel-tab">
			Section
			<div
				id="add-variables-plus-icon"
				style="position: absolute; right: 0.7rem; transition: 0.1s;">
				<i class="fas fa-chevron-down" />
			</div>
		</div>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Verdana, Geneva, Tahoma, sans-serif;
	}

	#left-panel {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 25rem;
		height: 100vh;
		background-color: rgba(40, 42, 44, 0.4);
		border-right: 1px solid #d65a31;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		box-shadow: rgba(6, 6, 6, 0.5) 15px 15px 25px;
		z-index: 5;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		overflow: auto;
		transition: left 0.5s;
		border-right-color: rgb(146, 61, 34);
	}

	:selection {
		background-color: #0650a8 !important;
		color: #e3e1de !important;
	}

	:-webkit-scrollbar {
		background-color: #252829;
		color: #a9a298;
		width: 7px;
	}

	:-webkit-scrollbar-thumb {
		background-color: rgb(164, 69, 38);
	}

	:-webkit-scrollbar-track {
		background-color: rgb(29, 31, 32);
		box-shadow: rgba(6, 6, 6, 0.5) 0px 0px 10px inset;
	}

	:-webkit-scrollbar-corner {
		background-color: #1d1f20;
	}

	.slider-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		height: 2.5rem;
		width: 2.5rem;
		background-color: transparent;
		color: rgb(227, 225, 222);
		right: 0;
		top: 0;
		font-size: 2rem;
		user-select: none;
		z-index: 10;
	}

	.slider-icon:hover {
		color: rgb(213, 106, 71);
	}

	.left-panel-content {
		width: 100%;
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		flex-direction: column;
		transform: translateY(3rem);
	}

	.slider-icon div {
		transition: transform 0.5s;
	}

	.left-panel-tab {
		display: flex;
		width: 100%;
		background-color: transparent;
		color: rgb(227, 225, 222);
		height: 2rem;
		font-size: 1.5rem;
		border: solid 1px white;
		border-width: 0 0 1px 0;
		padding: 1.5rem;
		margin-top: 0.5rem;
		justify-content: flex-start;
		align-items: center;
		user-select: none;
		overflow: visible;
		border-color: rgb(52, 56, 58);
	}

	.left-panel-tab:hover {
		background-color: rgb(164, 69, 38);
		color: rgb(227, 225, 222);
	}
</style>

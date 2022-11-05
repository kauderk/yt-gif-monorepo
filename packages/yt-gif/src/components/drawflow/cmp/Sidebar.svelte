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
<div style="display: none" class="col" bind:this={$ctx.templateDragableRoot}>
	{#each dragables as name}
		<Drag {name} drag={$ctx.dnd.drag} />
	{/each}
</div>

<script lang="ts" context="module">
	type base = {
		name: string
		expanded?: boolean
	}
	type folder = base & {
		children?: undefined
	}
	export type TFile =
		| (base & {
				children: (
					| (base & {
							children: base[]
					  })
					| folder
				)[]
		  })
		| folder
</script>

<script lang="ts">
	export let name: string
	export let isActive = ''
	$: type = name.slice(name.lastIndexOf('.') + 1)

	export let expandSimilar: () => void
	export let expandAncestors: () => void

	const outline = (b: b) => (b ? 'duotone' : 'thin')
</script>

<span class="node">
	<span class="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandSimilar}
			class="fa-{outline(isActive === name)} fa-diagram-nested" />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<i
			on:click={expandAncestors}
			class="fa-{outline(isActive === name)} fa-chart-gantt" />
	</span>

	<span class="title" class:active={isActive === name}>
		{name}
	</span>
</span>

<style>
	* {
		user-select: none;
	}

	.title {
		cursor: help;
	}
	.active {
		color: orange;
		font-weight: bold;
	}
</style>

<script lang="ts" context="module">
	type base = {
		type: string
		name: string
		expanded?: boolean
	}
	type folder = base & {
		files?: undefined
	}
	export type TFile =
		| (base & {
				files: (
					| (base & {
							files: base[]
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
</script>

<span class:active={isActive === name}>
	{name}
</span>

<style>
	span {
		padding: 0 0 0 1.5em;
		background: 0 0.1em no-repeat;
		background-size: 1em 1em;
		background: url(./icons/file.svg) 0 0.1em no-repeat;
	}
	.active {
		color: orange;
		font-weight: bold;
	}
</style>

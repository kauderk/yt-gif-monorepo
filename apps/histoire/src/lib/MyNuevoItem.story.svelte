<script>
	export let Hst

	import MenuItem from '@packages/yt-gif/src/v0.3.0/components/Dropdown/MenuItem.svelte'
	import { mdiClockTimeSevenOutline, mdiChevronRight } from '@mdi/js'
</script>

<Hst.Story title="Menu Item - yt-gif">
	<div>
		<span>
			<MenuItem
				leftIcon={mdiClockTimeSevenOutline}
				rightIcon={mdiChevronRight}>Contenido</MenuItem>
		</span>
	</div>
</Hst.Story>

<style>
	div {
		display: flex;
		width: auto;
		justify-content: center;
	}
	span > :global(div) {
		max-width: max-content;
	}
	span :global(.text-color-100) {
		color: white !important;
	}
	span :global(svg) {
		color: #b4defe !important;
	}
</style>

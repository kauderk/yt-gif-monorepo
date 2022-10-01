<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import TimestampDrop from './components/TimestampDrop.svelte'
	import options from './components/Formatters'

	export let type: 'start' | 'end' = 'start'
	export let pear: true | undefined = undefined
	export let value: n | undefined = 0
	export let formatted: s = '00:00'

	$: conf = [type, pear ?? 'pears', 'emulation'].filter(s => !!s).join(' ')
</script>

<span class="wrapper">
	<span
		class="rm-video-timestamp dont-focus-block"
		data-conf={conf}
		data-timestamp={value}>
		<TimestampDrop let:close={click}>
			<svelte:fragment slot="top">
				{formatted}
			</svelte:fragment>
			<div class="vertical">
				<Icon {...options.ytgif} {click} />
				<Icon {...options.swapFormats} {click} />
			</div>
		</TimestampDrop>
	</span>
</span>

<style lang="scss">
	[data-conf*='start'] {
		--c: var(--hsla-tm-start);
	}
	[data-conf*='end'] {
		--c: var(--hsla-tm-end);
	}
	[data-conf*='emulation'] {
		filter: brightness(70%);
		position: relative;
		& :global(*) {
			color: var(--c);
		}
	}
	[data-conf*='pears'] {
		filter: brightness(100%);
	}
	.wrapper {
		display: table-cell;
		cursor: pointer;
		transition: all;
		&:hover {
			// TODO: theme confilct
			background: hsla(
				var(--h-hover),
				var(--s-hover),
				calc(var(--l-hover) + 20%),
				var(--a-hover)
			);
		}
		> .rm-video-timestamp {
			position: relative;
			display: block;
			width: fit-content;
		}
	}
	.vertical {
		display: flex;
		flex-direction: column;
	}
</style>

<script lang="ts">
	import Tooltip from '$v3/components/Tooltip.svelte'
	import Sub from '$v3/components/ytgif/components/Sub.svelte'

	let sub: Sub
</script>

<div class="wrapper hover-bg">
	<Tooltip tag="a" on:open={e => sub?.state?.openTryClose(e.detail)}>
		<slot name="top" />
	</Tooltip>
	<div class="ddmf">
		<Sub bind:this={sub} let:open type="">
			<slot close={() => open(false)} />
		</Sub>
	</div>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
		display: inline-flex;
		.ddmf {
			position: absolute;
			transform: translateX(-50%);
			left: 50%;
			bottom: 100%;
		}
	}
</style>

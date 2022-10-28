<script lang="ts">
	import Node from '$cmp/graph-node/index.svelte'
	import { swap, tempTarget } from '$stores/fly'
	import { receive, send } from '$lib/transitions/crossfade'

	let theater = false

	let status: s
	let iN = 'theater'
</script>

<div
	class="card"
	class:theater
	class:swap={$swap.swap}
	on:click|preventDefault|stopPropagation>
	<div class="text-holder">
		<Node />
	</div>
	<!-- <div use:scrollMid class="media-holder">
		<Player {width} />
	</div> -->
	{#if !$swap.swap}
		<div
			in:receive={{ key: iN }}
			out:send={{ key: iN }}
			class="media-holder"
			bind:this={$tempTarget}
			on:introstart={() => (status = 'intro started')}
			on:outrostart={() => (status = 'M: outro started')}
			on:introend={() => (status = 'M: intro ended')}
			on:outroend={() => (status = 'outro ended')} />
	{/if}
</div>
<button
	on:click={() => {
		theater = !theater
		if (theater) {
			$swap.swap = $swap.swap
		}
	}}>Switch</button>
status: {status}

<style lang="scss">
	.card {
		position: relative;

		background: #f7f3d542;
		height: inherit;

		&.swap {
			.text-holder {
				width: 100%;
			}
		}

		&.theater {
			.text-holder {
				transform: translateX(-100px);
				opacity: 0;
			}
			.media-holder {
				right: 0;
				height: 100%;
				width: 100%;
			}
		}
		.text-holder {
			padding: 0.3em;
			width: 70%;
			height: 100%;
			transition: all 0.3s;
		}
		.media-holder {
			position: absolute;
			top: 50%;
			right: 0;
			height: inherit;
			background-color: rgba(0, 255, 234, 0.138);
			transform: translateY(-50%);
			width: 30%;

			border-radius: 0 5px 5px 0;
			transition: all 0.4s ease-in-out 0.075s;
		}
	}
</style>

<script>
	import Player from '$v3/components/ytgif/Player.svelte'
	import Node from '$cmp/graph-node/index.svelte'
</script>

<!-- Depends on global CSS-OPEN-PROPS variable -->

<!-- Icons -->
<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
</svelte:head>

<main>
	<div class="card">
		<div class="big">
			<Node />
		</div>
		<!-- <h5>Lorem ipsum dolor</h5>
		<p>Quis nostrud nisi ut aliquip ea commodo consequat.</p>
		<a href="/">Check it</a> -->
	</div>

	<div class="card">
		<div class="mid">
			<Node />
		</div>
		<!-- <h5>Consectetur adipiscing elit</h5>
		<p>Duis aute irure dolor in cillum dolore eu.</p>
		<a href="/">Check it</a> -->
	</div>

	<div class="card">
		<div class="small">
			<Node />
		</div>
		<!-- <h5>Ut enim</h5>
		<p>Excepteur sint occaecat cupidatat non proident.</p>
		<a href="/">Ready for action</a> -->
	</div>
	<div class="card">
		<div class="tall">
			<Node />
		</div>
		<!-- <h5>Ut enim</h5>
		<p>Excepteur sint occaecat cupidatat non proident.</p>
		<a href="/">Ready for action</a> -->
	</div>
</main>

<style lang="scss">
	.tall {
		width: 300px;
		aspect-ratio: 16 / 9;
	}
	.small {
		width: 400px;
	}
	.mid {
		width: 500px;
		aspect-ratio: 16 / 9;
	}
	.big {
		width: 800px;
		aspect-ratio: 16 / 9;
	}
	main {
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		/* max-inline-size: calc(var(--size-content-1) * 4); */
		gap: var(--size-5);
		padding: var(--size-5);
		flex-direction: row;
		justify-content: space-evenly;
	}

	.card {
		flex-basis: var(--size-content-1);
		display: flex;
		flex-direction: column;
		gap: var(--size-2);
		//background: var(--surface-4);
		border: 1px solid var(--surface-1);
		padding: var(--size-4);
		border-radius: var(--radius-3);
		box-shadow: var(--shadow-2);

		/* stack grain with a gradient */
		background-image: radial-gradient(
				circle at top right,
				var(--orange-3),
				rgba(191, 179, 255, 0)
			),
			radial-gradient(
				circle at bottom left,
				var(--orange-5),
				rgba(134, 172, 249, 0)
			);
		/* force colors and noise to collide */

		/* fit noise image to element */
	}
	// h5 {
	// 	text-shadow: 0px 0px 10px var(--gray-8);
	// }
	:global(html.dark) .card {
		background-image: var(--gradient-23);
	}

	// .card > h5 {
	// 	line-height: var(--font-lineheight-1);
	// }
</style>

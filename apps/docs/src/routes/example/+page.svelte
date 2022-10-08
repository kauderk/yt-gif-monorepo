<main>
	<div class="card">
		<img
			src="https://doodleipsum.com/500x500/hand-drawn?i=b48528b59f8d071fde57e51d2d6c433d"
			alt="Card image cap" />
		<h5>Lorem ipsum dolor</h5>
		<p>Quis nostrud nisi ut aliquip ea commodo consequat.</p>
		<a href="#">Check it</a>
	</div>

	<div class="card">
		<img
			src="https://doodleipsum.com/500x500/hand-drawn?i=9b11b7fde5591be86d8928901e68355f"
			alt="Card image cap" />
		<h5>Consectetur adipiscing elit</h5>
		<p>Duis aute irure dolor in cillum dolore eu.</p>
		<a href="#">Check it</a>
	</div>

	<div class="card">
		<img
			class="card-img"
			src="https://doodleipsum.com/500x500/hand-drawn?i=74c909f45ddde824d103db53e2a71e63"
			alt="Card image cap" />
		<h5>Ut enim</h5>
		<p>Excepteur sint occaecat cupidatat non proident.</p>
		<a href="#">Ready for action</a>
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		justify-content: space-around;
		max-inline-size: calc(var(--size-content-1) * 4);
		gap: var(--size-5);
		padding: var(--size-5);
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
	h5 {
		text-shadow: 0px 0px 10px var(--gray-8);
	}
	:global(html.dark) .card {
		background-image: var(--gradient-23);
	}

	.card > h5 {
		line-height: var(--font-lineheight-1);
	}
</style>

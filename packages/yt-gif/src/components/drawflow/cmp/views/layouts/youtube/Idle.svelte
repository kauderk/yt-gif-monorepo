<script>
	let id = ''
	let ready = false

	// Player Ready
	function playerReady() {
		id =
			'JE9z-gy4De4?enablejsapi=1&amp;html5=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0'
		setTimeout(function () {
			ready = true
		}, 500)
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="card"
	class:video-is-open={id}
	on:mousemove={function (e) {
		const x = e.pageX - e.target.offsetLeft
		const y = e.pageY - e.target.offsetTop

		e.target.style.setProperty('--x', x + 'px')
		e.target.style.setProperty('--y', y + 'px')
	}}
	on:click={playerReady}>
	<div class="card-play" />
	<div class="card-video" style:display={ready ? 'block' : ''}>
		{#key id}
			{#if id}
				<!-- svelte-ignore a11y-missing-attribute -->
				<iframe
					width="560"
					height="315"
					src="https://www.youtube.com/embed/{id}"
					frameborder="0"
					allow="autoplay; encrypted-media"
					allowfullscreen />
			{/if}
		{/key}
	</div>
</div>

<style lang="scss">
	/* ------------ SETTINGS ------------ */

	$card-image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1613479/inception.jpg';
	$card-icon: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1613479/play.svg';

	$white: #fff;
	$black: #000;

	/* ------------ CARD ------------ */

	// Main
	.card {
		width: 70vw;
		height: calc(9 / 16 * 70vw);
		max-width: calc(16 / 9 * 70vh);
		max-height: 70vh;
		display: flex;
		position: relative;
		border-radius: 6px;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
		background: url($card-image) center center / cover;
		overflow: hidden;
	}

	// Play icon
	.card-play {
		width: 48px;
		height: 48px;
		position: relative;
		z-index: 1;
		margin: auto;
		opacity: 0;
		background: url($card-icon) center center / cover;
		cursor: pointer;
		transition: opacity 0.3s ease-out;
	}

	// Animation
	.card-play:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: $black;
		transition: all 0.5s ease-out;
	}

	// Video
	.card-video {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 2;
		background: $black;

		iframe {
			width: 100%;
			height: 100%;
		}
	}

	// Shine effect
	.card:after {
		content: '';
		width: 250%;
		height: 250%;
		position: absolute;
		top: var(--y);
		left: var(--x);
		transform: translate(-50%, -50%);
		opacity: 0;
		background: radial-gradient(
			circle closest-side,
			rgba(255, 255, 255, 0.3),
			transparent
		);
		transition: opacity 0.5s ease-out;
	}

	/* ------------ STATES ------------ */

	.card:hover:after,
	.card:hover .card-play {
		opacity: 1;
	}

	.video-is-open:after {
		display: none;
	}

	.video-is-open .card-play {
		opacity: 1;

		&:after {
			width: 2vh;
			height: 2vh;
			transform: translate(-50%, -50%) scale(16/9 * 50);
			transition: transform 0.5s ease-out;
		}
	}
</style>

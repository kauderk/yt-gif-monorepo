<script lang="ts">
	import Player from '$v3/components/ytgif/Player.svelte'

	let toggled = false
	let videoId: s
</script>

<div class="card" class:toggled on:click|preventDefault|stopPropagation>
	<div class="text-holder">
		<h1>Click the card</h1>

		<input type="text" bind:value={videoId} placeholder="T33NN_pPeNI" />

		<div class="scrollable">
			<textarea id="field" placeholder="Type Here" />
		</div>
	</div>
	<div
		class="media-holder"
		on:click|preventDefault|stopPropagation={() => (toggled = !toggled)}>
		<Player />
	</div>
</div>

<style lang="scss">
	:root {
		--h: 9em;
		--pw: calc((var(--h) / 0.5625)); // 100%
		--p: 1em;
		--iw: 80%;
	}
	.fx {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.2em;
	}
	input {
		background: var(--ddm-400);
		color: var(--ddm-100);
		width: 50%;
		box-shadow: 1px solid transparent;
		margin: 0.2em 0;
	}

	textarea {
		resize: none !important;
		overflow: hidden;
		border: none;
		font-family: 'Montserrat Alternates';
		outline: none;
		background: var(--ddm-300);
		color: var(--ddm-100);
		width: -webkit-fill-available;
		height: 100%;
		border-radius: 5px;
	}

	textarea::-webkit-input-placeholder {
		color: var(--dmm-200);
	}

	textarea:focus {
		box-shadow: 2px solid var(--dmm-400);
	}
	textarea:focus,
	textarea:hover {
		box-shadow: 0px 0px 13px 0px var(--dmm-300);
	}

	.card {
		position: relative;
		overflow: hidden;

		aspect-ratio: 16 / 9;
		height: inherit;
		max-height: 80% !important;
		padding: var(--p);

		background: var(--ddm-500);
		border: 1px solid var(--ddm-600);
		border-radius: 15px;
		box-shadow: 15px 15px 37px -10px var(--ddm-700);

		&:hover {
			cursor: pointer;
		}
		&.toggled {
			:is(p, h1, input, .scrollable) {
				transform: translateY(100px);
				opacity: 0;
			}
			.media-holder {
				right: 0;
				height: 100%;
				width: 100%;
			}
		}
	}

	.text-holder {
		width: 75%;
		margin: 0;
		color: var(--ddm-100);
		display: flex;
		flex-direction: column;
		height: 100%;

		h1,
		p,
		input,
		.scrollable {
			margin-bottom: 0;
			transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
		}
		h1 {
			margin-block-start: 0;
			font-size: 1rem;
		}
		p {
			font-size: 1rem;
		}
		.scrollable {
			height: 100%;
			&::-webkit-scrollbar {
				width: 0.7em;
			}

			&::-webkit-scrollbar-track {
				background-color: var(--ddm-400);
				border-radius: 100px;
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 100px;
				border: 1px solid var(--ddm-700);
				border-left: 0;
				border-right: 0;
				background-color: var(--ddm-600);
			}
		}
	}

	.media-holder {
		position: absolute;
		transform: translateY(-50%);

		top: 50%;
		right: 1rem;

		width: 20%;
		height: 90%;

		border-radius: 3px;
		box-shadow: 0 0 5px 2px var(--ddm-600);

		transition: all 0.4s ease-in-out 0.075s;
	}

	// player
	.media-holder {
		display: flex;
		justify-content: center;
		align-items: center;

		:global(div) {
			width: 95% !important;
			margin: auto;
			overflow: hidden !important;
		}
	}
</style>

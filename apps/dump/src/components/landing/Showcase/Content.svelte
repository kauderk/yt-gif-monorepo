<script lang="ts">
	import { lorem } from '$lib/random/lorem'
	import Controls from './Controls.svelte'
	import Typewriter from 'svelte-typewriter'

	export let clazz = 'profile-default'
</script>

<section>
	<div class="profile {clazz}">
		<div class="profile__image">
			<img src="/video-placeholder.jpg" alt="Doggo" />
		</div>
		<div class="profile__info">
			<Typewriter mode="loopRandom" delay={500} interval={200}>
				<h3>{lorem.generateWords(1)}</h3>
			</Typewriter>
			<Typewriter mode="loopRandom">
				<p class="profile__info__extra">
					{lorem.generateWords(11)}
				</p>
			</Typewriter>
		</div>
		<div class="profile__stats">
			<p class="profile__stats__title">Tags</p>
			<h5 class="profile__stats__info">
				{lorem
					.randomWords(1, 3)
					.map(w => '#' + w)
					.join(' ')}
			</h5>
		</div>
		<div class="profile__stats">
			<p class="profile__stats__title">Start</p>
			<h5>00:20</h5>
		</div>
		<div class="profile__stats">
			<p class="profile__stats__title">End</p>
			<h5 class="profile__stats__info">00:50</h5>
		</div>
		<div class="profile__cta">
			<span class="button">
				<Controls />
			</span>
		</div>
	</div>
</section>

<style lang="scss">
	h3 {
		font: 700 24px/1.2 'Poppins', sans-serif;
		margin-bottom: 10px;
	}
	h5 {
		font: 500 18px/1.2 'Poppins', sans-serif;
		margin-bottom: 10px;
	}
	/*buttons & links*/

	.button {
		outline: none;
		width: 100%;
		text-align: center;
		display: inline-block;
		border: none;
		font: 500 16px/1 'Poppins', sans-serif;
		padding: 0.25em;
		cursor: pointer;
		border-radius: var(--borderRadius);
		background: var(--primaryShade2);
		color: var(--backgroundColor);
		position: relative;
		top: 0;
		transition: 0.2s ease;
		&:hover {
			top: -3px;
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
		}
		&:active {
			background: var(--primaryShade4);
			outline: none;
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
			top: 0;
		}
	}
	.profile {
		position: relative;
		background: var(--backgroundColor);
		color: var(--foregroundColor);
		box-shadow: 0 3px 15px rgba(#333, 0.2);
		border-radius: 10px;
		transition: 0.2s ease;
		&__image {
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		&__stats {
			&__title {
				color: var(--grayColor);
				text-transform: uppercase;
				font-size: 16px;
			}
		}
		.button {
			&:hover {
				top: 0;
				box-shadow: none;
				background: var(--primaryShade4);
			}
			&:active,
			&:focus {
				top: 0;
				box-shadow: none;
				background: var(--primaryShade5);
			}
		}
	}
	@media (min-width: 1200px) {
		section {
			&:nth-child(1) {
				grid-column: 1 / 3;
				justify-self: end;
				align-self: end;
			}
			&:nth-child(2) {
				grid-column: 3 / 5;
			}
			&:nth-child(3) {
				grid-column: 5 / 7;
				align-self: end;
			}
			&:nth-child(4) {
				grid-column: 1 / 7;
				justify-self: center;
			}
			&:nth-child(5) {
				grid-column: 1 / 4;
				justify-self: end;
			}
			&:nth-child(6) {
				grid-column: 4 / 7;
				align-self: center;
			}
			&:nth-child(7) {
				grid-column: 1 / 7;
			}
		}
	}
</style>

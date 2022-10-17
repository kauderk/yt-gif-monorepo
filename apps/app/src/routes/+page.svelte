<script>
	import LandingPage from '$cmp/landing/LandingPage.svelte'
</script>

<LandingPage />

<!-- <h1 class="">Welcome to SvelteKit</h1>
<p>Visit <a class="text-blue-600 underline" href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<style lang="scss" global>
	main#main .profile-default {
		min-width: 400px;
		max-width: 450px;
		margin: auto;
		overflow: hidden;
		display: grid;
		grid: 340px auto auto / repeat(3, minmax(80px, 1fr));
		grid-gap: 10px;
		.profile__image {
			grid-column: span 3;
			img {
				border-bottom: 7px solid var(--secondaryColor);
			}
		}
		.profile__info {
			grid-column: span 3;
			margin: 20px 25px 0;
		}
		.profile__stats {
			margin: 5px 25px;
		}
		.profile__cta {
			grid-column: span 3;
			margin: 0 25px 25px;
		}
	}
	main#main .profile-smallimg {
		width: 300px;
		border-radius: 10px;
		text-align: center;
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: 10px;
		text-align: center;
		.profile__image {
			margin-top: -40px;
			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
				border: 5px solid var(--backgroundColor);
				box-shadow: 0 0 0 7px var(--secondaryColor);
				// TODO:: tailwind
				display: inline !important;
			}
		}
		.profile__info {
			margin: 10px 30px 15px;
		}
		.profile__stats {
			margin: 0 30px 10px;
			// FIXME: prettier is missbehaving
			// prettier-ignore
			&:nth-of-type(n+4) {
				display: none;
			}
		}
		.profile__cta {
			a {
				border-radius: 0 0 10px 10px;
			}
		}
	}

	main#main .profile-long {
		display: grid;
		grid-template-columns: repeat(4, 1fr) 100px;
		padding: 20px 20px 15px;
		min-width: 570px;
		.profile__image {
			grid-column: 5 / 6;
			margin-bottom: 10px;
			img {
				border-radius: 50%;
				width: 100px;
				height: 100px;
			}
		}
		.profile__info {
			grid-column: 1 / 5;
			grid-row: 1;
			padding: 5px 20px 20px 0;
		}
		.profile__stats {
			min-width: 100px;
			padding-top: 20px;
			border-top: 0.5px solid var(--grayColor);
		}
		.profile__cta {
			grid-column: span 2;
			border-top: 0.5px solid var(--grayColor);
			padding-top: 15px;
		}
	}

	main#main .profile-table {
		display: grid;
		max-width: 780px;
		grid-template-columns: 100px 1fr auto;
		grid-auto-flow: dense;
		overflow: hidden;
		.profile__image {
			grid-column: 1;
		}
		.profile__stats {
			display: none;
		}
		.profile__info {
			grid-column: 2 / 5;
			padding: 20px 15px 20px 20px;
		}
		.profile__cta {
			grid-column: 5 / 6;
			align-self: center;
			padding-right: 25px;
		}
	}

	main#main .profile-wide {
		display: grid;
		grid-template-columns: auto repeat(3, 1fr);
		grid-auto-flow: dense;
		min-width: 500px;
		max-width: 590px;
		.profile__image {
			padding: 30px 20px 20px;
			grid-row: 1 / 3;
			img {
				width: 120px;
				height: 120px;
				border-radius: 50%;
				border: 3px solid var(--backgroundColor);
				box-shadow: 0 0 0 4px var(--secondaryColor);
			}
		}
		.profile__stats {
			margin-bottom: 12px;
		}
		.profile__info {
			grid-column: span 3;
			padding: 25px 25px 15px 0;
		}
		.profile__cta {
			grid-column: span 4;
			a {
				border-radius: 0 0 10px 10px;
			}
		}
	}

	main#main .profile-imgonly {
		border-radius: 10px;
		overflow: hidden;
		width: 300px;
		display: grid;
		grid: 390px 0px / 100%;
		&:hover {
			grid: 334px 56px / 100%;
		}
		.profile__image,
		.profile__info {
			grid-row: 1 / 2;
			grid-column: 1 / 2;
		}
		.profile__image {
			position: relative;
			&:after {
				content: '';
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 30%;
				background: linear-gradient(
					to top,
					rgba(0, 0, 0, 0.65),
					rgba(0, 0, 0, 0)
				);
			}
		}
		.profile__stats {
			display: none;
		}
		.profile__info {
			z-index: 5;
			grid-row: 1 / 2;
			align-self: end;
			margin: 10px 20px;
			color: #fff;
			text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
			p {
				display: none;
			}
		}
		.profile__cta a {
			border-radius: 0;
		}
	}

	main#main .profile-bigimg {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 400px auto 0px;
		border-radius: 10px;
		width: 650px;
		overflow: hidden;
		margin: auto;
		.profile__image {
			grid-column: span 3;
		}
		.profile__info {
			grid-column: span 2;
			align-self: center;
			padding: 20px 10px 20px 25px;
			h3 {
				margin-bottom: 0;
			}
			&__extra {
				max-height: 0;
				overflow: hidden;
				opacity: 0;
				transition: max-height 0.3s ease, opacity 0.3s ease 0.3s,
					margin 0.3s ease;
			}
		}
		.profile__stats {
			display: none;
		}
		.profile__cta {
			padding: 20px 20px 20px 0;
			align-self: center;
		}
		&:hover {
			.profile__info__extra {
				display: block;
				max-height: 200px;
				margin: 10px 0 0;
				opacity: 1;
			}
		}
	}
</style>

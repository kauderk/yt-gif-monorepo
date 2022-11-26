<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData

	import { match } from './store'
	import { Api } from 'src/api'
</script>

<header>
	<nav class="navegation">
		{#each data.menu as { link, title = "" }}
			<a href={link} class="cool-hover" class:previous={match(title)}
				>{title}</a>
		{/each}
	</nav>
</header>

<button
	style="position: fixed;
    z-index: 10000;
    color: white;
    top: 0px;"
	on:click={async () => {
		const id = 'ZwLekxsSY3Y'
		const common = { query: { id } }

		Api.youtube.search.GET(common).Ok(o => console.log({ search: o.body }))

		Api.youtube.chapters
			.GET(common)
			.Ok(o => console.log({ chapters: o.body }))

		Api.youtube.transcript
			.GET(common)
			.Ok(o => console.log({ transcript: o.body }))
	}}>FETCH</button>

<slot />

<!-- https://codepen.io/ra_reyes/pen/gJwEWr -->
<style>
	.previous {
		color: rgba(0, 81, 255, 0.766) !important;
	}
	header {
		width: 100vw;
		height: 100vh;
		background: #000;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.navegation a {
		color: #fff;
		display: inline-block;
		font-size: 30px;
		text-decoration: none;
		font-weight: lighter;
		padding: 0 20px;
	}
	.cool-hover::after {
		content: '';
		display: block;
		width: 0;
		height: 5px;
		background: #0591cc;
		transition: width 0.3s;
	}

	.cool-hover:hover::after {
		width: 100%;
		transition: width 0.3s;
	}
</style>

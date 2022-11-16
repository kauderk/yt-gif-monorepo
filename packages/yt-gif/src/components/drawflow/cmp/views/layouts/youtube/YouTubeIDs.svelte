<!-- https://codepen.io/ahsan01/pen/RJWOpx -->
<script lang="ts">
	import { onMount } from 'svelte'
	import { dev } from '$app/environment'

	let id: string
	let data: any
	function mainVideo(_id: s) {
		id = _id
	}
	const key = 'AIzaSyCtndV2Y6xntlF3sApHr8hJUEa4VeCukEA'
	const playListId = 'PLNpkKhTLjPFH9aURP-176eL9G4yqYfI-k'
	const URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

	const options = {
		part: 'snippet',
		key,
		maxResults: 20,
		playlistId: playListId,
	}

	async function loadVids() {
		const fetched = dev
			? await import('./DummyYouTube.json')
			: await getJSON(URL, options)

		// @ts-ignore
		let id = fetched.items[0].snippet.resourceId.videoId
		mainVideo(id)
		data = fetched
	}

	function videoContent(item: any) {
		const thumb = item.snippet.thumbnails.medium.url
		const title = item.snippet.title
		const desciption = item.snippet.description.substring(0, 100)
		const vid = item.snippet.resourceId.videoId

		return { thumb, title, desciption, vid }
	}
	function getJSON(url: string, qs_params: any) {
		// https://codepen.io/ahsan01/pen/RJWOpx
		function buildQueryString(params: any) {
			return Object.entries(params)
				.map(d => `${d[0]}=${d[1]}`)
				.join('&')
		}

		return new Promise((resolve, reject) => {
			const qs = qs_params ? '?' + buildQueryString(qs_params) : ''
			const xhr = new XMLHttpRequest()
			xhr.open('GET', `${url}${qs}`)

			xhr.onload = function () {
				if (xhr.status >= 200 && xhr.status < 400) {
					resolve(JSON.parse(xhr.responseText))
				} else {
					resolve(xhr.responseText)
				}
			}
			xhr.onerror = () => reject(xhr.statusText)
			xhr.send()
		})
	}

	onMount(loadVids)
</script>

<div class="container">
	<section id="video">
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
	</section>

	<main>
		{#if data?.items}
			{#each data.items.map(videoContent) as item}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<article
					data-key={item.vid}
					on:click={e => mainVideo(item.vid)}>
					<img src={item.thumb} alt="" class="thumb" />
					<div class="details">
						<h1>{item.title}</h1>
						<p>{item.desciption}</p>
					</div>
				</article>
			{/each}
		{/if}
	</main>
</div>

<style lang="scss">
	@mixin font-base {
		margin: 0;
		padding: 0;
		line-height: 1.3;
		font-weight: 600;
	}

	p {
		@include font-base;
		font-size: 0.7rem;
	}

	.container {
		width: 560px;

		margin: 0px auto;
		color: white;
	}

	header,
	section {
		text-align: center;
		width: 560px;
	}

	section {
		top: 50px;
	}

	.logo {
		width: 120px;
		padding: 10px;
	}

	.thumb {
		width: 120px;
		height: 70px;
		border-radius: 4px;
	}

	article {
		display: flex;
		align-items: center;
		padding: 8px 12px;
		border-radius: 8px;
		transition: all 0.2s ease;
		margin: 0 auto;
		border: 2px solid transparent;

		&:hover {
			border: 2px solid #ff9999;
		}
	}
	.details {
		padding: 8px 12px;
	}
</style>

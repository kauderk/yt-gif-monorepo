<script lang="ts" context="module">
	let once = false
</script>

<script lang="ts">
	import { firebaseUser } from '$lib/modules/firebase/client'
	import { onMount } from 'svelte'

	let graph: HTMLElement

	let ready: any
	onMount(async () => {
		try {
			if (!once) {
				await CreateXload(
					'https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/dependencies.js'
				)
				once = true
			}
			// why does this work?
			await CreateXload(
				'https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/Graph.js'
			)
			// @ts-ignore
			new window.Graph({
				target: document.querySelector('yt-gif-graph'),
			})
		} catch (error) {
			console.log(error)
		}
		ready = true
	})
	export async function CreateXload(src: string) {
		const obj = {
			src: src,
			id: `script-yt_gif-${src}`,
		}

		romoveIfany(obj.id)
		const script = createScript(obj)
		return await loadScript(script)

		function romoveIfany(id: string) {
			document
				.querySelectorAll(`[id='${id}']`)
				.forEach(script => script.parentElement!.removeChild(script))
		}
		function createScript({ src, id } = obj) {
			const script = document.createElement('script')
			script.src = src + '?' + new Date().getTime()
			script.id = id
			script.async = false
			script.type = 'text/javascript'
			document.getElementsByTagName('head')[0].appendChild(script)
			return script
		}
		async function loadScript(
			script: HTMLScriptElement
		): Promise<HTMLScriptElement> {
			return new Promise(resolve => {
				//Script finished loading
				script.addEventListener('load', () => resolve(script))
			})
		}
	}
</script>

<svelte:head>
	<title>yt-gif-graph</title>
	<meta name="description" content="Content sharing app" />

	<link
		rel="stylesheet"
		href="https://kauderk.github.io/code-snippets/yt-gif-ddm/dist/Graph/Graph.css" />
</svelte:head>

{#if $firebaseUser}
	<yt-gif-graph />
	{#if !ready}
		<div class="hero bg-base-100 min-h-full">
			<div class="hero-content text-center">
				<div class="max-w-md">
					<p>loading...</p>
				</div>
			</div>
		</div>
	{/if}
{:else}
	<div class="hero bg-base-100 min-h-full">
		<div class="hero-content text-center">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold">YT-GIF-GRAPH</h1>
				<p class="py-6">Share your content with the world.</p>
				<div class="flex flex-col items-center">
					<a class="btn btn-primary w-fit" href="/register"
						>Get Started</a>
					<a class="link-primary text-sm mt-1" href="/login"
						>Sign in. I have an account.</a>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	yt-gif-graph {
		font-size: 16px;
	}
	yt-gif-graph > :global(div):first-child {
		text-align: center;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 1em;
	}
	yt-gif-graph :global(:is(button, label)) {
		display: inline-block;
		font-weight: 400;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		border: 0px solid transparent;
		padding: 0.375rem 0.75rem;
		font-size: 1rem;
		line-height: 1.5;
		border-radius: 0.25rem;
		transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
			border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
		font-size: 15px;
		transition: all 0.4s;
		background: rgb(170, 21, 51);
		border-color: var(--ddm-A100);
		color: white !important;
		padding: 11px 28px;
		font-size: 13px;
		letter-spacing: 0.9px;
		font-weight: 600;
		text-transform: uppercase;
	}
	yt-gif-graph :global(label) {
		filter: brightness(90%);
	}
	yt-gif-graph :global(.card) {
		border-color: #7c7467 !important;
	}
</style>

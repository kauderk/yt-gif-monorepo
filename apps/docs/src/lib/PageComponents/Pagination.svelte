<script lang="ts">
	import { page } from '$app/stores'
	import preload from '../../routes/[route]/preload.json'
	export let roots: string[] = preload.routes

	$: current = (href: string) => $page.url.pathname.startsWith(`/${href}`)
</script>

<nav>
	<!-- svelte-ignore a11y-missing-attribute -->
	<a href="/" class:current={$page.url.pathname == '/'}>/inicio</a>
	{#each roots as href}
		<a href="/{href}/home" class:current={current(href)}>/{href}</a>
	{/each}
</nav>

<style lang="scss">
	@import 'https://unpkg.com/open-props';

	nav {
		--_link-bg: white;
		--_link-text: var(--gray-7);

		display: flex;
		gap: var(--size-2);

		& > a {
			background-color: var(--_link-bg);
			color: var(--_link-text);
			padding-inline: var(--size-1);
			padding-block: var(--size-1);
			border-radius: var(--radius-2);
			text-decoration: none;
			outline-offset: 3px;
			transition: background-color 0.2s var(--ease-3),
				color 0.2s var(--ease-3);

			&[href]:is(.current, :hover, :focus-visible) {
				--_link-bg: var(--indigo-2);
				--_link-text: var(--indigo-0);
			}

			&:not([href]) {
				cursor: not-allowed;
				--_link-bg: transparent;
			}
		}
	}
</style>

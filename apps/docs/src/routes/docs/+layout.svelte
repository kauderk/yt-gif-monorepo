<script lang="ts">
	import Base from '$lib/Base.svelte'

	const pages = [
		{
			links: [
				{
					href: '',
					text: 'Home',
				},
				{
					href: 'markdown',
					text: 'Markdown Tips',
				},
			],
		},
		{
			title: 'Components',
			links: [
				{
					href: 'button',
					text: 'Button',
				},
			],
		},
	]
</script>

<Base {pages} path="/docs">
	<slot />
</Base>

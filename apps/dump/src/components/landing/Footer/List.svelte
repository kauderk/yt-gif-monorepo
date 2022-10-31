<script>
	export let config = {
		title: 'Company',
		routes: [
			{
				title: 'Link...',
				href: '/',
			},
		],
	}
</script>

<div class="flex-1">
	<p class="uppercase text-gray-500 dark:text-gray-100 md:mb-6">
		{config.title}
	</p>
	<ul class="list-reset mb-6">
		{#each config.routes as { title, href }}
			<li class="mt-2 inline-block mr-2 md:block md:mr-0">
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a
					{href}
					class="no-underline hover:underline text-gray-800 dark:text-gray-200 hover:text-pink-500"
					>{title}</a>
			</li>
		{/each}
	</ul>
</div>

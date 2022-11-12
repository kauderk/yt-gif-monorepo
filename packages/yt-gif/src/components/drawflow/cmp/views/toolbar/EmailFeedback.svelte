<!-- https://stackoverflow.com/questions/13231125/automatically-open-default-email-client-and-pre-populate-content -->
<script>
	import { onMount } from 'svelte'

	const email = 'yt-gif-graph@gmail.com'
	const subject = 'yt-gif-graph'
	const emailBody = 'Feedback about...'
	const send = `mailto:${email}?subject=${subject}&body=${emailBody}`

	let loaded = false
	onMount(() => {
		loaded = true
		return () => (loaded = false)
	})
</script>

<svelte:head>
	{#if loaded}
		<script
			async
			defer
			data-theme="light"
			src="https://cdn.jsdelivr.net/gh/samuelstroschein/bromb/packages/web/dist/widget.js"></script>
	{/if}
</svelte:head>

<!-- https://github.com/kommitapp/kommit/search?q=OLSKAppToolbarGuideLink -->
<a href="https://submission.bromb.co/jujiliqi/k">Give Feedback</a>

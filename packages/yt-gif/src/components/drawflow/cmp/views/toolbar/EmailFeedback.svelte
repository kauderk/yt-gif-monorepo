<script lang="ts">
	import { onMount } from 'svelte'
	import { CreateXload } from '$lib/dom'

	onMount(async () => {
		await CreateXload('https://unpkg.com/feedbackfin@^1')

		window.feedbackfin = { config: {}, ...window.feedbackfin }
		window.feedbackfin.config.url =
			'https://rowy-hooks-yvhyzywkga-nn.a.run.app/wh/FeedbackFin/BZUfAEweZftboUDHzsYL'
		window.feedbackfin.init()
	})
</script>

<button data-feedbackfin-button>Feedback</button>

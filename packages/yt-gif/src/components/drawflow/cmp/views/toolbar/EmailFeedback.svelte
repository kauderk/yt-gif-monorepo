<!-- https://stackoverflow.com/questions/13231125/automatically-open-default-email-client-and-pre-populate-content -->
<script>
	const email = 'yt-gif-graph@gmail.com'
	const subject = 'yt-gif-graph'
	const emailBody = 'Feedback about...'
	const send = `mailto:${email}?subject=${subject}&body=${emailBody}`
</script>

<!-- https://github.com/kommitapp/kommit/search?q=OLSKAppToolbarGuideLink -->
<a href={send}>Send feedback</a>

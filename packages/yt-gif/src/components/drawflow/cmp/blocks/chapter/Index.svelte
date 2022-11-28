<script lang="ts">
	export let content = '?'
	export let title = 'YouTube video chapter'
	export let start = 0
	export let thumbnail = {
		src: 'https://i.ytimg.com/vi/ZwLekxsSY3Y/hqdefault_32866.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLDSP6XmNskcKck840PXSpFXiRAQGQ',
		width: 168,
		height: 94,
	}
</script>

<div>
	<div>CHAPTER</div>
	<div>
		{title} starts at {start}
	</div>
	<img alt="YouTube video chapter: {title}" {...thumbnail} />
	<div>
		{content}
	</div>
</div>

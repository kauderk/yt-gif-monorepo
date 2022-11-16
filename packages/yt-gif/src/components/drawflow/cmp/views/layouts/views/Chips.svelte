<!-- https://github.com/snuffyDev/Beatbump/blob/53842a6f2733e665803fb9301350a9e9f427149b/app/src/routes/trending/%2Bpage.svelte -->
<script lang="ts">
	const carouselItems = [
		{
			results: [
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
				{ color: 'red', endpoint: { params: '' }, text: 'txt' },
			],
		},
	]
</script>

<main>
	<div class="breakout">
		<div class="box-cont">
			<div class="header">
				<span class="h2">title</span>
				<a class="link" href="/explore"><small>See All</small></a>
			</div>
			<box>
				<div class="scroll">
					{#each carouselItems[0].results as { color = 'red', endpoint = { params: '' }, text = 'txt' }}
						<a
							style="border-left: 0.5rem solid #{color}"
							class="box"
							href="/explore/{endpoint.params}">{text}</a>
					{/each}
				</div>
			</box>
		</div>
	</div>
</main>

<style lang="scss">
	.breakout {
		border-radius: 0.8rem;
		-webkit-overflow-scrolling: touch;
		position: relative;

		margin-bottom: 2rem;

		@media screen and (min-width: 960px) {
			margin-bottom: 3rem;
		}
	}
	.box-cont {
		justify-content: space-around;
	}
	box {
		display: flex;
		width: 100%;
		overflow-x: auto;
		padding: 0.8rem;
		contain: layout;
		flex-direction: column;
	}
	.scroll {
		display: flex;
		flex-flow: column wrap;
		gap: 0.8rem;
		max-height: 26rem;
	}
	.box {
		margin-bottom: 0.8em;
		cursor: pointer;
		background: #201e27;
		display: inline-flex;
		justify-content: flex-start;
		flex-direction: row;
		flex-wrap: nowrap;
		text-overflow: clip;
		font-size: 1em;
		min-width: 12em;
		max-width: 15em;
		width: 100%;
		contain: content;
		border-radius: 0.8em;
		font-family: 'CommissionerVariable', sans-serif;

		align-items: center;

		height: 3.25em;
		padding: 0 0 0 0.8rem;
	}
</style>

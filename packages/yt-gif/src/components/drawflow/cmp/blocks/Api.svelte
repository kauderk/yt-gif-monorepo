<script lang="ts">
	import { Subscribe } from 'svelte-subscribe'

	import {
		MakeGETQueries,
		PlaceholderID,
	} from 'src/routes/api/youtube/get-endpoints'

	import { CreateChapterBlocks } from './chapter/create'
	import { CreateTranscriptBlock } from './transcript/create'

	const queries = MakeGETQueries()
</script>

<div>
	<div class="title-box">Hello World</div>
	<div class="box">
		<div class="flex">
			{#each Object.entries(queries) as [key, { query, params }]}
				<div class="row">
					<label for="{key}_api">{key} @YouTube</label>
					<input
						type="text"
						id="{key}_api"
						placeholder={PlaceholderID}
						bind:value={params.query.id} />
					<!-- Stores must be declared at the top level of the component -->
					<Subscribe {query} let:query>
						<button
							on:click={async _ => {
								const f = await query.refetch({
									cancelRefetch: true,
								})
								if (key == 'chapters') {
									CreateChapterBlocks(f.data)
								}
								if (key == 'transcript') {
									CreateTranscriptBlock(f.data)
								}
							}}>Fetch</button>
						{#if query && query.data}
							done
						{/if}
					</Subscribe>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.title-box {
		margin-bottom: 8px;
	}

	.flex {
		display: flex;
		gap: 1em;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	input {
		color: rgb(224, 224, 224);
		background-color: rgba(255, 255, 255, 0.099);
		padding: 2px;
	}
</style>

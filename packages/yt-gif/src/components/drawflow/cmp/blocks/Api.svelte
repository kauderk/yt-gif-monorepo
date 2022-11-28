<script lang="ts">
	import { Subscribe } from 'svelte-subscribe'

	import {
		MakeGETQueries,
		PlaceholderID,
	} from 'src/routes/api/youtube/get-endpoints'

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
							}}>Fetch</button>
						{#if query && query.data}
							{JSON.stringify(query.data, null, 2)}
						{/if}
					</Subscribe>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.flex {
		display: flex;
		gap: 1em;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	input {
		color: black;
	}
</style>

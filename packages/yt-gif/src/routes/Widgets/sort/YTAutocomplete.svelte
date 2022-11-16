<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query'
	// @ts-ignore
	import AutoComplete from 'simple-svelte-autocomplete'

	// https://javascript.plainenglish.io/how-to-fetch-data-after-user-input-with-react-query-b083d51b5d2d
	// it's a shame you can't pass, refetch params
	let queryKey = 'empty'

	const ytQuery = useQuery(
		'ytsearch',
		async _ => fetch(`./sort?keyword=${queryKey}`).then(res => res.json()),
		{
			refetchOnWindowFocus: false,
			enabled: false,
		}
	)

	async function handelInput(userKeyword: s) {
		queryKey = userKeyword
		const o = await $ytQuery.refetch({ cancelRefetch: true })

		if (o.data) {
			return o.data.items // { title, id }[]
		}
	}
</script>

<div class="arama">
	<AutoComplete
		searchFunction={handelInput}
		localFiltering={false}
		keywordsFunction={o => o.id}
		labelFieldName="title"
		valueFieldName="id" />
</div>

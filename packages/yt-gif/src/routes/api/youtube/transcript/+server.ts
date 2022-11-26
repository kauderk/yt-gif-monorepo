// @ts-ignore
import YoutubeTranscript from 'youtube-transcript'
import { getDomainText, ParseUniqueIDs } from '$lib/fetch'
import axios from 'axios'
import { getSummaryOptions, Script } from './summary'
import { API, querySpread } from 'sveltekit-zero-api'
import { Ok } from 'sveltekit-zero-api/http'
import type { RequireAtLeastOne } from '$lib/types/utilities'

type TQuery = { sum?: boolean } & RequireAtLeastOne<{
	list: string
	id: string
}>

export const GET = async (event: API<{ query: TQuery }>) => {
	const params = querySpread(event)
	if (params.id) {
		return Ok({ body: await fetchTranscript(params) })
	}

	if (params.list) {
		return Ok({ body: await getPlaylistTranscripts(params) })
	}
}
async function getPlaylistTranscripts(params: TQuery) {
	const ids = await getDomainText(
		`https://www.youtube.com/playlist?list=${params.list}&g=1`
	).then(ParseUniqueIDs)

	return await Promise.all(
		ids.map(async id => ({ id, ...(await fetchTranscript(params)) }))
	)
}

async function fetchTranscript(params: TQuery) {
	const transcript = await YoutubeTranscript.fetchTranscript(params.id!)
	return {
		transcript: !params.sum ? transcript : '',
		//
		transcript_summary: params.sum
			? await axios.request(getSummaryOptions(await Script(transcript)))
			: '',
	}
}

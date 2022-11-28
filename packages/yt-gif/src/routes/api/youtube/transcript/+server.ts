// @ts-ignore
import YoutubeTranscript, { TranscriptResponse } from 'youtube-transcript'
import { getDomainText, ParseUniqueIDs } from '$lib/fetch'
import axios, { AxiosResponse } from 'axios'
import { getSummaryOptions } from './summary'
import { API, querySpread } from 'sveltekit-zero-api'
import { Ok } from 'sveltekit-zero-api/http'
import type { RequireAtLeastOne } from '$lib/types/utilities'
import { Script } from './parse'

type TQuery = { sum?: boolean } & RequireAtLeastOne<{
	list: string
	id: string
}>
export type TranscriptData = {
	id?:
		| {
				transcript: TranscriptResponse[] | null
				transcript_summary: AxiosResponse<any, any> | null
		  }
		| undefined
	list?:
		| {
				transcript: TranscriptResponse[] | null
				transcript_summary: AxiosResponse<any, any> | null
		  }[]
		| undefined
}
export const GET = async (event: API<{ query: TQuery }>) => {
	const params = querySpread(event)
	let res: { id?: TRes; list?: TRes[] } = {}

	if (params.id) {
		res.id = await fetchTranscript(params)
	}

	if (params.list) {
		res.list = await getPlaylistTranscripts(params)
	}

	return Ok({ body: res })
}
async function getPlaylistTranscripts(params: TQuery) {
	const ids = await getDomainText(
		`https://www.youtube.com/playlist?list=${params.list}&g=1`
	).then(ParseUniqueIDs)

	return await Promise.all(
		ids.map(async id => ({ id, ...(await fetchTranscript(params)) }))
	)
}
type TRes = Awaited<ReturnType<typeof fetchTranscript>>
async function fetchTranscript(params: TQuery) {
	const transcript = await YoutubeTranscript.fetchTranscript(params.id!)
	return {
		transcript: !params.sum ? transcript : null,
		//
		transcript_summary: params.sum
			? await axios.request(getSummaryOptions(await Script(transcript)))
			: null,
	}
}

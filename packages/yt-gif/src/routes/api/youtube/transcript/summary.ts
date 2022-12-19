// @ts-ignore
import { PRIVATE_RAPIDAPI_KEY } from '$env/static/private'

export function getSummaryOptions(text: s) {
	const encodedParams = new URLSearchParams()
	encodedParams.append('text', text)
	encodedParams.append('sentnum', '5')

	const options = {
		method: 'POST',
		url: 'https://textanalysis-text-summarization.p.rapidapi.com/text-summarizer-text',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'X-RapidAPI-Key': PRIVATE_RAPIDAPI_KEY,
			'X-RapidAPI-Host': 'textanalysis-text-summarization.p.rapidapi.com',
		},
		data: encodedParams,
	}
	return options
}

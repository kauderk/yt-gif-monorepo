import { CreateXload } from '$lib/dom'

export function getSugestion(request, response) {
	/* google geliştirici kimliği (zorunlu değil) */
	const apiKey =
		'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg'
	/* aranacak kelime */
	const query = request.term
	/* youtube sorgusu */
	const jq = window.$
	jq.ajax({
		url: `https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q=${query}&key=${apiKey}&format=5&alt=json&callback=?`,
		dataType: 'jsonp',
		success: function (data) {
			response(jq.map(data[1], itemToData))
		},
	})
}

function itemToData(item): any {
	return {
		label: item[0],
		value: item[0],
	}
}

export async function LoadJQuery() {
	if (window.$) return window.$

	await Promise.all([
		CreateXload(
			'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'
		),
		CreateXload(
			'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js'
		),
	])
	// @ts-ignore
	return window.$
}

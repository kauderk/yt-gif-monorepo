/* ********************* */

export async function tryToGetUrlDuration(id: string) {
	// @ts-ignore //TODO:
	const key = window.YT_GIF_DIRECT_SETTINGS.get('YT_API_KEY_V3')?.sessionValue // yikes
	if (!key) return null

	try {
		const url = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=snippet,contentDetails`
		const res = await asyncAjax(url)
		// @ts-ignore //TODO:
		const youtube_time = res.items[0].contentDetails.duration
		console.log(`youtube_time: ${youtube_time}, id: ${id}`)
		return formatISODate(youtube_time)
	} catch (error) {}

	return null
}
function asyncAjax(url: string) {
	// https://stackoverflow.com/questions/27612372/how-to-await-the-ajax-request#:~:text=return%20new%20Promise(function(resolve%2C%20reject)%20%7B
	return new Promise(function (resolve, reject) {
		// @ts-ignore //TODO:
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
			beforeSend: function () {},
			success: (data: unknown) => resolve(data),
			error: (err: unknown) => reject(err),
		})
	})
}
function formatISODate(youtube_time: string) {
	// https://stackoverflow.com/questions/2086260/youtube-player-api-how-to-get-duration-of-a-loaded-cued-video-without-playing-i#:~:text=function%20formatISODate(youtube_time)%7B
	const arr = youtube_time.match(/(\d+)(?=[MHS])/gi) || []
	return arr.map(i => (i.length < 2 ? '0' + i : i)).join(':')
}

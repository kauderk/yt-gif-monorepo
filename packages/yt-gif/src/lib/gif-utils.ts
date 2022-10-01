import players from './players'

function pauseC_playV(key: string, atEnd = false) {
	const playPauseBtn = players.getAnyValidPlayPauseBtn()
	const video = players.getAnyValidPlayer()
	if (!playPauseBtn || !video)
		// no video
		return "Couldn't find play/pause button"
	if (!atEnd && video.ended) return 'Video ended, avoiding replay'

	const title = () =>
		playPauseBtn.title ||
		playPauseBtn.dataset.originalTitle ||
		playPauseBtn.ariaLabel ||
		''
	const isPlaying = () => title().toLowerCase().includes('play')

	if (key == 'c')
		// alt + c playOnly
		isPlaying() ? playPauseBtn.click() : ''
	if (key == 'v')
		// alt + v pauseOnly
		!isPlaying() ? playPauseBtn.click() : ''
}
function focus_() {
	const video = players.getAnyValidPlayer()
	window.focus()
	video?.focus()
}
function removeEventLisnters(obj = window.Gif.events) {
	// @ts-ignore
	for (const [k, v] of Object.entries(obj)) window.removeEventListener(k, v)
}
function addEventListeners(obj = window.Gif.events) {
	// @ts-ignore
	for (const [k, v] of Object.entries(obj)) window.addEventListener(k, v)
}

export { pauseC_playV, focus_, removeEventLisnters, addEventListeners }

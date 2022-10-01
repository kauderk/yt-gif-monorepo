import { CreateXload } from './helpers'
;(async function () {
	await LoadExternalResources()
	await window.YT_GIF_SETTINGS_PAGE_INIT()
	await CreateXload(
		'https://kauderk.github.io/yt-gif-extension/v0.2.0/js/yt-gif-app.js'
	)
})()

async function LoadExternalResources() {
	if (
		typeof window.kauderk !== 'undefined' &&
		typeof window.kauderk.util !== 'undefined' &&
		typeof window.kauderk.rap != 'undefined' &&
		typeof window.YT != 'undefined'
	) {
		return 'already loaded'
	} else {
		await loadYT_IFRAME_API()
		await CreateXload(
			'https://kauderk.github.io/yt-gif-extension/resources/js/utils.js'
		)
		await CreateXload(
			'https://kauderk.github.io/yt-gif-extension/resources/js/utils-roam-alpha-api.js'
		)
		await CreateXload(
			'https://kauderk.github.io/yt-gif-extension/v0.2.0/js/settings-page.js'
		)
	}
	function loadYT_IFRAME_API(): Promise<HTMLScriptElement> {
		const script = document.createElement('script')
		script.src = 'https://www.youtube.com/player_api'
		const firstScriptTag = document.getElementsByTagName('script')[0]
		firstScriptTag.parentNode!.insertBefore(script, firstScriptTag)
		return new Promise(resolve => (script.onload = () => resolve(script)))
	}
}

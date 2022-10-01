let src = 'https://www.youtube.com/iframe_api'
let loading = false
let loaded = false
let listeners: Function[] = []

export function load(callback: Function) {
	// @ts-ignore
	listeners.push(callback)

	if (loaded) {
		setTimeout(done)
		return
	}

	if (loading) {
		return
	}

	loading = true

	// @ts-ignore
	window.onYouTubeIframeAPIReady = function () {
		loaded = true
		done()
	}

	let script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = src
	document.body.appendChild(script)
}

async function done() {
	// @ts-ignore
	delete window.onYouTubeIframeAPIReady

	while (listeners.length) {
		// @ts-ignore
		await listeners.pop()(window.YT)
	}
}

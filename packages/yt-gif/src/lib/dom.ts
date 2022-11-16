export async function CreateXload(
	src: string,
	onCreate?: (pending: HTMLScriptElement) => void
) {
	const obj = {
		src: src,
		id: `script-yt_gif-${src}`,
	}

	romoveIfany(obj.id)
	const script = createScript(obj)
	return await loadScript(script)

	function romoveIfany(id: string) {
		document
			.queryAllasArr(`[id='${id}']`)
			.forEach(script => script.parentElement!.removeChild(script))
	}
	function createScript({ src, id } = obj) {
		const script = document.createElement('script')
		script.src = src + '?' + new Date().getTime()
		script.id = id
		script.async = false
		script.type = 'text/javascript'
		onCreate?.(script)
		document.getElementsByTagName('head')[0].appendChild(script)
		return script
	}
	async function loadScript(
		script: HTMLScriptElement
	): Promise<HTMLScriptElement> {
		return new Promise(resolve => {
			//Script finished loading
			script.addEventListener('load', () => resolve(script))
		})
	}
}

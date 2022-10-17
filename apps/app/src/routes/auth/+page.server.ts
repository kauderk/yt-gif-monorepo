const innerRoutes = import.meta.glob('./**/+page.svelte')
const root = import.meta.url?.replace(/\/$/, '').split('/').at(-2)

let body = []
for (const path in innerRoutes) {
	const folders = path.replace('/+page.svelte', '')
	const lastFolder = folders.substring(folders.lastIndexOf('/') + 1)
	body.push({
		title: lastFolder == '.' ? root : lastFolder,
		link: root + '/' + lastFolder,
	})
}

export const load = async () => {
	return {
		menu: Promise.all(body),
	}
}

export const getMenu = (
	innerRoutes: Record<string, () => Promise<unknown>>,
	folder = ''
) => {
	const root = import.meta.url?.replace(/\/$/, '').split('/').at(-2)

	let body: {
		title?: string
		link: string
	}[] = []

	for (const path in innerRoutes) {
		const folders = path.replace('/+page.svelte', '')
		const lastFolder = folders.substring(folders.lastIndexOf('/') + 1)

		body.push({
			title: lastFolder == '.' ? root : lastFolder,
			link: (lastFolder == '.' ? '' : folder) + '/' + lastFolder,
		})
	}

	return async () => {
		return {
			menu: Promise.all(body),
		}
	}
}

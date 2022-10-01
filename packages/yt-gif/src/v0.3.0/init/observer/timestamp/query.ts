import { ObjectKeys } from '$lib/utils'
import { getLastAnchorCmptInHierarchy } from '../../../lib/backend-frontend/xxx-congif'
import { closest_container_request } from '../../../lib/dom/elements-yt-gif-parent'

export async function getYTwrapperRootObj(uid: string, tEl: Element) {
	const { foundBlock } = await getLastAnchorCmptInHierarchy(uid)
	if (!foundBlock?.uid)
		console.warn(
			`YT GIF Timestamps: couldn't find YT GIFs within the Hierarchy: ((${uid}))`
		)
	const { uid: f_uid } = foundBlock || { uid: '' }
	return _getYTwrapperRootObj(f_uid, tEl)
}
export async function _getYTwrapperRootObj(f_uid: string, tEl: Element) {
	const barObj = {
		tEl,
		condition: function (): boolean {
			//@ts-ignore // shuold be ok...
			return this.tEl?.closest(`.${this.root}`) ? true : false
		},
	}
	const PagesObj = {
		main: {
			root: 'roam-article',
			crossRoot: 'rm-sidebar-outline',
			...barObj,
		},
		side: {
			root: 'rm-sidebar-outline',
			crossRoot: 'roam-article',
			...barObj,
		},
		pageRef: {
			root: 'rm-reference-main',
			crossRoot: 'rm-sidebar-outline',
			...barObj,
		},
	}

	const key = ObjectKeys(PagesObj).find(x => PagesObj[x].condition())!
	const { root, crossRoot } = PagesObj[key]
	const blockExist = document.querySelector(`.${root} [id$="${f_uid}"]`)

	// root -> roam-article || rm-sidebar-outline
	const WrappersInBlock = (r: s) => {
		const wrappers = document.queryAllasArr(
			`.${r} [id$="${f_uid}"] .yt-gif-wrapper`
		)

		if (r == PagesObj.main.crossRoot) return wrappers // they don't have this tEl

		return wrappers
			.map(pw => closest_container_request(pw))
			.filter(pc => pc?.contains(tEl))
			.map(c => c?.queryAllasArr(`[id$="${f_uid}"] .yt-gif-wrapper`))
			.flat(Infinity) as Element[]
	}

	const lastWrapperInBlock = (r = root) =>
		[...WrappersInBlock(r)]?.pop() ?? null

	return <const>{
		lastWrapperInBlock,
		WrappersInBlock,
		f_uid,
		blockExist: !!blockExist && lastWrapperInBlock(root),
		root,
		crossRoot,
		mainRoot: PagesObj.main.root,
	}
}

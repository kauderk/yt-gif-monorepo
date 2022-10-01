import { YTGIF_Config } from '../../../lib/types/config'
import { isRendered } from '../../../lib/dom/elements-yt-gif-parent'

export function getYTUrlObj(rm_btn: El) {
	const ytUrlEl = rm_btn?.nextSibling as HTMLLinkElement

	let url: string = ytUrlEl?.href

	if (!YTGIF_Config.guardClause(url)) url = ''

	return <const>{ url, ytUrlEl }
}
export function NodesRecord(Nodes: NodeList, sel: s) {
	if (!Nodes || Nodes.length == 0) return []

	const ElsArr = Array.from(Nodes)
		.map(nd => nd as HTMLElement)
		.filter(el => !!el.tagName)

	return ElsArr.map((x: HTMLElement) => {
		if (x.classList.contains(sel)) return x
		else return Array.from(x.querySelectorAll(`.${sel}`))
	})
		.flat(Infinity)
		.filter((v, i, a) => {
			v = v as El
			return (
				!!v &&
				getYTUrlObj(v).url &&
				!hasYTGifAttr(v) &&
				!hasYTGifClass(v) &&
				v.classList.contains(sel) &&
				a.indexOf(v) === i &&
				isRendered(v)
			)
		}) as HTMLElement[]
}
export function hasYTGifClass(b: El) {
	return Array.from(b.classList).some(x => x.includes('yt-gif'))
}
export function hasYTGifAttr(b: El) {
	return Array.from(b.attributes)
		.map(a => a.name)
		.some(x => x.includes('yt-gif'))
}

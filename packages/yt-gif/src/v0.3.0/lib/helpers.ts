import { fmtTimestamp } from '../init/timestamp/utils'
import { ElementsPerBlock } from './dom/ytgif'
import { floatParam, paramRgx } from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function replaceString({ string, start, end, replace }: any) {
	if (start < 0 || start > string.length) {
		throw new RangeError(
			`start index ${start} is out of the range 0~${string.length}`
		)
	}
	if (end > string.length || end < start) {
		throw new RangeError(
			`end index ${end} is out of the range ${start}~${string.length}`
		)
	}
	return string.substring(0, start) + replace + string.substring(end)
}
export function delSubstr(str: string, st: number, ed: number) {
	return str.substring(0, st) + str.substring(ed)
}
export function NonReferencedPerBlock(
	block: Element,
	selector: string,
	targetNode: Element
) {
	const inBlockEls = ElementsPerBlock(block, selector)
	const closestRef = (el: El) => el.closest('.rm-block-ref[data-uid]')
	const refParent = closestRef(targetNode)

	const innerElms = ChildrenPerEml(selector, refParent)
	const elemtToFilter = innerElms.length != 0 ? innerElms : inBlockEls
	const condition = (b: El) => (refParent ? closestRef(b) : !closestRef(b))

	return elemtToFilter.filter(condition)
	function ChildrenPerEml(selector: string, parent: El | null) {
		if (!parent) return []
		return parent
			.queryAllasArr(selector)
			.filter(b => b.closest(selector) == parent)
	}
}
export function isSpace(s: string) {
	// https://stackoverflow.com/questions/1496826/check-if-a-single-character-is-a-whitespace#:~:text=return%20/%5Cs/g.test(s)%3B
	return /\s/g.test(s)
}
export function getConcatS(string: string) {
	return isSpace([...string].pop()!) ? '' : ' '
}
export function anyVisibleChar(word: string) {
	return [...word].some(c => !isSpace(c))
}
export function rgx2Gm(rgx: RegExp) {
	return new RegExp(rgx.source, 'gm')
}
export function stopEvents(e: Event) {
	e.preventDefault()
	e.stopPropagation()
}
type TurlFmt = {
	match: string
	value?: string | number
	p: string
	float: boolean
	fmt: keyof Itime
}
/**
 * append page param if missing
 */
export function tryFmt_urlParam({
	match,
	value,
	p,
	float,
	fmt = 'S',
}: TurlFmt) {
	let m = match,
		v = value

	v = !float ? fmtTimestamp(fmt)(v ?? '0') : Number(v)
	if (!v || v == '0' || v == '0s') return m

	const replace = new RegExp(`(${paramRgx(p).source})`)
	if (replace.test(m)) {
		return m.replace(replace, `${p}=${v}`)
	} else {
		const c = [...m].pop() == '?' ? '' : m.includes('?') ? '&' : '?' // ends on '?' then it is blank, else add '&' or '?' depending on which is missing
		return (m += `${c}${p}=${v}`)
	}
}
export function assertTmParams(url: string, fmt_?: string) {
	// HOLY SHIT THIS IS MADNESS!
	const fmt = (p: string, v: number) =>
		tryFmt_urlParam({
			match: url,
			value: v,
			p,

			float: false,
			// @ts-ignore
			fmt: fmt_ ?? UI.timestamps.tm_workflow_grab.value,
		})
	url = fmt('t', floatParam('t', url))
	url = fmt('end', floatParam('end', url))
	return url
}
export function getAnyTmParamType(url: string) {
	return getTypeOfTmParam('t', url) || getTypeOfTmParam('end', url)
}
export function validTmParam(url: string) {
	return floatParam('t', url) ?? floatParam('end', url)
}
export function getTypeOfTmParam(p: string, url: string) {
	const str = paramRgx(p)?.exec(url)?.[2] as string
	if (/:/.test(str)) return 'HMS' // lessHMS
	if (/h|m|s/.test(str)) return 'hmsSufix'
	if (/\d+/.test(str)) return 'S'
}
export async function CreateXload(src: string) {
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

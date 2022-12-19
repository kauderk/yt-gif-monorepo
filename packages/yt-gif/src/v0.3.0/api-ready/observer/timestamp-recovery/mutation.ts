import { ElementsPerBlock } from '$v3/lib/dom/ytgif'
import { closestBlock, closest_attr } from '$v3/lib/dom/elements-yt-gif-parent'

export function getMutationNodes(
	getCrrContainer: ILocalWrapper['getCrrContainer'],
	mutationsList: MutationRecord[],
	MutationObj: TMutationObj
) {
	let added = Array<T_tmRecord>()
	let lastActive = Array<T_tmRecord>()
	const rm_container = getCrrContainer()

	for (const record of mutationsList) {
		const t = record.target
		if (t == rm_container || !underSameObs()) continue
		if (record.type == 'attributes') {
			lastActive = [
				...lastActive,
				...NodesRecord(
					getCrrContainer,
					record.target,
					'last-active-timestamp',
					t
				),
			]
			continue
		}

		if (!(record.target as El).hasAttribute('class')) continue

		const { removedNodes, addedNodes } = record
		MutationObj.removed = [
			...MutationObj.removed,
			...NodesRecord(
				getCrrContainer,
				removedNodes,
				'active-timestamp',
				t
			),
		]
		added = [
			...added,
			...NodesRecord(
				getCrrContainer,
				addedNodes,
				'yt-gif-timestamp-emulation',
				t
			),
		]
	}

	MutationObj.removed = validArr(MutationObj.removed)
	added = validArr(added)
	lastActive = validArr(lastActive)
	function validArr<T>(arr: T[]) {
		return arr.flat(Infinity).filter(x => !!x)
	}

	return <const>{ lastActive, added }

	// TODO: added param, I believe the return func never gets executed
	function underSameObs() {
		const rmAt = (el: El, attr: s) => closest_attr(el, attr).found
		return (el: El) =>
			[
				rmAt(el, 'data-yt-gif-block-uid'),
				rmAt(el, 'yt-gif-anchor-container'),
			].some(v => v == rm_container)
	}
}
function NodesRecord(
	getCrrContainer: ILocalWrapper['getCrrContainer'],
	Nodes: NodeList | Node,
	attr: s,
	target: Node
): T_tmRecord[] {
	if (!Nodes || (Nodes as NodeList).length == 0) return []

	const ElsArr = (Nodes instanceof NodeList ? Array.from(Nodes) : [Nodes])
		.map(nd => nd as HTMLElement)
		.filter(el => !!el.tagName)

	const _targetEl = target as HTMLElement

	//#region utils
	const rm_container = getCrrContainer()! // typescript!

	const siblingIndex = (siblings: El[], el: El) =>
		Array.from(siblings).flat(Infinity).indexOf(el)

	const getChildren = (sel: s) => rm_container.queryAllasArr(sel)
	const getChildrenArr = (sel: s, self?: b) =>
		!self ? getChildren(sel) : [rm_container, ...getChildren(sel)]

	function timestampObj(page: startEnd, arr: El[]) {
		return getTmpObj(
			arr.find(x => x.getAttribute('timestamp-style') == page) as El,
			page,
			arr
		)
	}
	function lastTimestampObj(el: El, arr: El[]) {
		return getTmpObj(
			el,
			el.getAttribute('timestamp-style') as startEnd,
			arr
		)
	}
	function getTmpObj(el: El, page: startEnd, arr: El[]): T_tmsRec {
		return <const>{
			el,
			timestamp: el?.getAttribute('timestamp') as s,
			index: arr.indexOf(el),
			page,
			otherPage: (page == 'start' ? 'end' : 'start') as startEnd,
		}
	}

	//#endregion
	return ElsArr.map(x => {
		if (x.hasAttribute(attr)) return x
		else return x.queryAllasArr(`[${attr}]`)
	})
		.flat(Infinity)
		.map(el => closestBlock(el as El))
		.filter((v, i, a) => !!v && a.indexOf(v) === i) // remove duplicates
		.map(block => {
			block = block as HTMLElement // shouldn't be necessary

			// prettier-ignore
			const allTimestamps = ElementsPerBlock(block, '[yt-gif-timestamp-emulation]') || [];
			// prettier-ignore
			const activeTimestamps = allTimestamps.filter(x => x.hasAttribute(attr)) || [];
			// prettier-ignore
			const lastActiveEl = activeTimestamps.find(x => x.hasAttribute('last-active-timestamp') || x.hasAttribute(attr)) as El;

			return <const>{
				blockID: block.id,
				blockIndex: siblingIndex(
					getChildrenArr('.rm-block__input')!,
					block
				),
				containerIndex: siblingIndex(
					getChildrenArr('.roam-block-container', true)!,
					rm_container
				),
				workflow: 'strict',

				node: _targetEl.querySelector('[yt-gif-timestamp-emulation]')!,
				start: timestampObj('start', activeTimestamps),
				end: timestampObj('end', activeTimestamps),
				target: lastTimestampObj(lastActiveEl, activeTimestamps),
			}
		})
}
export type TMutationObj = { removed: TMutArr; lastActive: TMutArr }
export type TMutIdx = TlastActiveTm['lastActiveTimestamp'] | T_tmRecord
export type TMutArr = Array<TMutIdx>
type T_tmsRec = {
	el: El
	timestamp: string
	index: number
	page: startEnd
	otherPage: startEnd
}
export interface T_tmRecord {
	blockID: string
	blockIndex: number
	containerIndex: number
	workflow: string
	node: Element
	start: T_tmsRec
	end: T_tmsRec
	target: T_tmsRec
}

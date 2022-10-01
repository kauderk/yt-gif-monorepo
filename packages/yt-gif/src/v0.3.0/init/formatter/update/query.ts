import { getBlockInfoByUIDM } from '$lib/utils-roam-alpha-api'
import { Wild_Config } from '$v3/lib/types/Wild_Config'
import type { TIndexPair } from '../query/regex'

export async function TryRecycle(
	recycledRequest: TBlockInfo[][] | null,
	tempUid: string
) {
	const blockReq = recycledRequest ?? (await getBlockInfoByUIDM(tempUid))
	const info = blockReq?.[0]?.[0]
	return { info, blockReq }
}
export function filterOutCode(indexObj: TIndexPair[]) {
	const inlindeCodeRgx = /(`.+?`)|(`([\s\S]*?)`)/gm
	return [...indexObj].filter(x => !inlindeCodeRgx.test(x.match as s))
}
export function GetPossibleMatches(
	IndexObj: (rgx: RegExp, type: s) => TIndexPair[],
	toReplace: string
) {
	// https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string#:~:text=var%20m%20%3D%20this.match(new%20RegExp(search.toString().replace(/(%3F%3D%5B.%5C%5C%2B*%3F%5B%5E%5C%5D%24()%7B%7D%5C%7C%5D)/g%2C%20%22%5C%5C%22)%2C%20%22g%22))%3B
	return IndexObj(
		// prettier-ignore
		new RegExp(`(${toReplace.replace(/(?=[.\\+*?[^\]$(){}\|])/g, '\\')})`, 'gm'),
		'urlsMatch'
	)
}
export function GetBadMatches(
	IndexObj: (rgx: RegExp, type: s) => TIndexPair[],
	toReplace: string
) {
	const BadIndexMatches = [
		...IndexObj(/(`.+?`)|(`([\s\S]*?)`)/gm, 'codeBlocks'),
		...filterOutCode(IndexObj(/{{=:(.+?)\|(.+)}}/gm, 'tooltipPrompt')).map(
			promptToBadCode
		),
	]
	const cmptRgx = Wild_Config.targetStringRgx // anyPossibleComponentsRgx

	// 1.1 get out of your own way?
	if (!toReplace.match(cmptRgx)?.[0]) {
		// if it were to be component it would've have filter out itself later on
		BadIndexMatches.push(...IndexObj(cmptRgx, 'components'))
	}
	return BadIndexMatches
}
export function TryGetStartEnd(
	validSubstrings: TIndexPair[],
	replaceIndex: number
) {
	let start, end
	try {
		// I'm making a bet... if there is exactly one valid substring,
		// And the same time if the replaceIndex is out of bounds ... >
		// then I'm going to assume that the one "THING" the user clicked on
		// is unique whitin that particular block.
		if (validSubstrings.length == 1 && !validSubstrings[replaceIndex]) {
			replaceIndex = 0
		}
		start = validSubstrings[replaceIndex].start
		end = validSubstrings[replaceIndex].end
	} catch (error) {
		console.log('yt-gif debugger')
		throw new Error(
			`YT GIF Formatter: Crashed because of out of bounds target...`
		)
	}
	return { start, end, replaceIndex }
}
export function rightMatch(BadIndexMatches: TIndexPair[], good: TIndexPair) {
	let specialCase = false
	const badIndex = BadIndexMatches.some(bad => {
		const bounded = good.start >= bad.start && good.end <= bad.end
		specialCase = bad.type == 'tooltipPrompt'
		return bounded
	})
	if (specialCase) return true
	return !badIndex
}
function promptToBadCode(op: TIndexPair) {
	const y = { ...op }

	y.start = op.start + 4 // 4 = {{=:
	y.end = op.end - (1 + op.groups[2]?.length + 2) // 1 = |     +    [2].length = hiidden content   +    2 = }}
	y.match = op.groups[1] // prompt
	return y
}

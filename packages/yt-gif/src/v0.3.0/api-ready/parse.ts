import type { URLResults } from 'src/v0.3.0/api-ready/setup/url-result'
import {
	CheckFalsePositive,
	GetNewID,
	CreateConfigParams,
	CreateRecordID,
} from 'src/v0.3.0/api-ready/setup/query'

type TResult = Awaited<ReturnType<typeof URLResults>>

export default function parse(id: s, videoId: s) {
	const wrapper = document.getElementById(id)! as HTMLElement

	const uidResult = <TResult>{
		uid: '123456789',
		preUrlIndex: 0,
		accUrlIndex: 0,
		url: 'https://www.youtube.com/watch?v=' + videoId,
		grandParentBlock: wrapper.parentNode,
		nestedComponentMap: {},
	}
	// don't add up false positives
	if (CheckFalsePositive({ ...uidResult, wrapper })) return null

	return State(uidResult, id)
}
export function State(uidResult: TResult, id: s) {
	// OnPlayerReady video params point of reference
	const configParams = CreateConfigParams(id, uidResult.url)

	// target's point of reference
	const { blockID, record } = CreateRecordID(uidResult)

	return { uidResult, configParams, blockID, record, id }
}

import { UIStore } from '$v3/init/config/UIStore'
import { ElementsPerBlock } from '$v3/lib/dom/ytgif'
import type { T_tmRecord } from '../mutation'
import { TryToRecoverActiveTimestamp } from './query'

export async function TryToRestore(
	{ getObsTimestamp, delObsTimestmp, getCrrContainer }: ILocalWrapper,
	added: T_tmRecord[]
) {
	const commonObj = added.find(a => OkObservedTimestamp(getObsTimestamp, a))
	const restoreMath =
		!!commonObj && UIStore.get().timestamps.tm_recovery.checked
	if (!restoreMath) {
		return false
	}

	const block = document.getElementById(commonObj.blockID)

	// wait until all timestamps are rendered
	if (AnyInvalidRawTimestamp(block)) {
		return true
	}

	const equals = GetEquals(getObsTimestamp, block)

	// cleanup - since it's a rendered mismatch
	if (UIStore.get().timestamps.tm_restore.value == 'match' && !equals()) {
		delObsTimestmp()
		return true
	}

	// value == 'any' - go ahead with anything in this position
	await TryToRecoverActiveTimestamp(
		//
		getCrrContainer,
		getObsTimestamp(),
		{ simMessage: equals() ? 'visuals' : '' }
	)
	return true
}
function GetEquals(
	getObsTimestamp: ILocalWrapper['getObsTimestamp'],
	block: HTMLElement | null
) {
	type tms = 'timestamp' | 'index'
	const get = (k: tms) => getObsTimestamp()?.target[k]

	return (k: tms = 'timestamp') =>
		get(k)?.toString() ==
		ElementsPerBlock(block, `[${k}]`)?.[
			//TODO: null may be converted to 0
			Number(get('index'))
		]?.getAttribute?.(k)
}
function AnyInvalidRawTimestamp(block: HTMLElement | null) {
	const rawComponents = ElementsPerBlock(
		block,
		'.rm-xparser-default-start, .rm-xparser-default-end'
	)
	const rendered = rawComponents.length > 0
	return rendered
}
function OkObservedTimestamp(
	getObsTimestamp: ILocalWrapper['getObsTimestamp'],
	aO: T_tmRecord
) {
	return !!aO.blockID && aO.blockID == getObsTimestamp()?.blockID
}

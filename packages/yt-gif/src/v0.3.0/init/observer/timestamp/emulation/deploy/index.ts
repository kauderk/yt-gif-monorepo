import type { IArrObj } from '../../types'
import { durationObj, GetDuration } from '../durationObj'
import { SortEmulationArr, GetPears } from './query'
import { Callbacks } from './callback'
import type { TPears} from './assign';
import { Checks, AssignCallbacks } from './assign'

export async function TryToDeployTimestampElms(
	map_successfulEmulationArr: Map<string, IArrObj[]>
) {
	if (map_successfulEmulationArr.size === 0) {
		return
	}
	const { getDuration } = await durationObj(map_successfulEmulationArr)
	for (const values of map_successfulEmulationArr.values()) {
		for (const ArrObjs of SortEmulationArr(values)) {
			const pears = GetPears(ArrObjs)

			for (const o of ArrObjs) {
				if (!o?.targetNode) {
					continue
				}

				AssembleTimestampElms(o, pears, getDuration)
			}
		}
	}
}

function AssembleTimestampElms(
	o: IArrObj,
	pears: TPears,
	getDuration: Awaited<ReturnType<typeof durationObj>>['getDuration']
) {
	const check = Checks(o, pears)
	check.tryToCollapse()

	const duration = GetDuration(getDuration(o.blockID))
	const callbacks = Callbacks(o, duration, check, pears)
	callbacks.tryValidateSelf(duration)

	AssignCallbacks(o, callbacks)
}

import { StartEnd_Config } from '../../../../../lib/types/config'
import {} from '$lib/utils-roam-alpha-api'
import { isNotZoomPath, sleep } from '$lib/utils'
import {
	getMap_smart,
	getComponentMap,
} from '../../../../../lib/backend-frontend/get-maps'
import { isRendered } from '../../../../../lib/dom/elements-yt-gif-parent'
import type { IArrObj } from '../../types'
import { DelayedBlocks } from './guard-clause'
import type { TIDs } from './query/objects'

export function Local(found: El[]) {
	const componentMapMap: Trm_map = new Map()
	let _startEndMap: Trm_map = new Map()

	return <const>{
		componentMapMap,

		siblingsArr: Array<El>(),
		get startEndMap() {
			return _startEndMap
		},

		map_successfulEmulationArr: new Map<string, Array<IArrObj>>(),

		renderedComponents: found.filter(
			el => isRendered(el) && isNotZoomPath(el)
		),

		TryUpdateAgain,
		update_startEndComponentMap,

		TryUpdateMap,
	}
	async function TryUpdateMap(
		ids: TIDs,
		siblingsArr: Element[],
		node: Element
	) {
		await update_startEndComponentMap(ids)
		if (DelayedBlocks(_startEndMap, siblingsArr, node)) {
			await TryUpdateAgain(ids)
		}
	}
	async function TryUpdateAgain(ids: TIDs) {
		// console.count(`YT GIF Timestamps: updating block strings: ((${tempUID})) ...        ...       ...         ...`);
		await sleep(800) // YIKES!!!
		await AddTimestampMap(ids)
		await update_startEndComponentMap(ids)
	}

	async function update_startEndComponentMap({ mapsKEY, tempUID }: TIDs) {
		_startEndMap = await getMap_smart(
			mapsKEY,
			componentMapMap,
			getComponentMap,
			//
			tempUID,
			StartEnd_Config
		)
	}

	async function AddTimestampMap({ mapsKEY, tempUID }: TIDs) {
		componentMapMap.set(
			mapsKEY,
			await getComponentMap(tempUID, StartEnd_Config)
		)
	}
}

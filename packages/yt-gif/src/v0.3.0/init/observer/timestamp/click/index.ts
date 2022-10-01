import { ClickResetWrapper } from '../../../../lib/event/ClickResetWrapper'
import { PulseObj } from '../../../timestamp/lib'
import { getRelevantWrapperObjFunc1, getClicks1 } from './query'
import type { IClickInput } from '$v3/init/observer/timestamp/types'
import { Event, Local } from './Flow'

// 6.1.1

export async function PlayPauseOnClicks(
	e: T_TmClickDetailEvent,
	input: IClickInput
) {
	const evt = Event(e)
	if (evt.isPending()) {
		return
	}
	evt.pending()

	const { resolve } = evt

	const pulse = PulseObj(evt.tEl)
	const click = getClicks1(evt.detail.which)

	const search = await getRelevantWrapperObjFunc1(evt.tEl, input)
	const { lastWrapperInBlock, f_uid, blockExist, root } = search
	const local = Local(pulse, evt, search, input)

	if (!blockExist) {
		// fail
		if (click.left || click.right || !f_uid) {
			local.TryToDeactivateSet()
		} else if (click.right) {
			await local.OpenBlockOnCrossRoot()
		}

		return resolve()
	}

	if (click.left || click.right) {
		// success
		if (e['altKey']) {
			await ClickResetWrapper(lastWrapperInBlock(root), {
				'delete-obs-tm': true,
			})
		} else if (click.left) {
			await local.tryPlayLastBlock_SimHover(root)
		} else if (click.right) {
			await local.PlayPause_SimHover(root)
		}

		return resolve()
	}

	if (click.right) {
		// opening?
		await local.OpenBlockOnCrossRoot()
	}

	return resolve()
}

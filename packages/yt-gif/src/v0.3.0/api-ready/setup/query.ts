import {
	recordedIDs,
	UIDtoURLInstancesMapMap,
	allVideoParameters,
	sessionIDs,
} from '$v3/lib/types/config'
import { ChangeElementType } from '$lib/utils'
import { cssData, attrInfo, links } from '$v3/init/config/paths'
import { iframeIDprfx } from '$v3/init/config/yt-gif-init'
import {
	properBlockIDSufix,
	closest_container,
} from '$v3/lib/dom/elements-yt-gif-parent'
import { T_YT_RECORD } from '$v3/lib/types/yt-types'
import { isInput_selectedValid } from '$v3/lib/dom/select/isInputSelected'
import { ExtractParamsFromUrl } from '$v3/init/formatter/query/extract'
import { SrrGlobal } from '$lib/global/SrrGlobal'

export function SetupTimestampObserver(grandParentBlock: Element, uid: string) {
	const rm_container = closest_container(grandParentBlock)
	rm_container?.setAttribute('yt-gif-block-uid', uid)
	return rm_container
}
export function GetNewID() {
	return iframeIDprfx + Number(++SrrGlobal.YT_GIF_OBSERVERS.creationCounter)
}
export function CreateRecordID(o: {
	uid: string
	grandParentBlock: Element
	url: string
	accUrlIndex: number
}) {
	debugger
	const record = new T_YT_RECORD()
	sessionIDs.uid = o.uid
	const blockID =
		o.grandParentBlock.id + properBlockIDSufix(o.url, o.accUrlIndex)
	if (blockID != null) recordedIDs.set(blockID, record)
	return <const>{ blockID, record }
}
export function CreateConfigParams(newId: string, url: string) {
	allVideoParameters.set(newId, ExtractParamsFromUrl(url))
	const configParams = allVideoParameters.get(newId)! // I just created it!
	return configParams
}
export function CheckFalsePositive(o: {
	url: string
	accUrlIndex: number
	uid: string
	wrapper: HTMLElement
}) {
	if (!o.url || o.accUrlIndex < 0 || !o.uid) {
		UIDtoURLInstancesMapMap.delete(o.uid)
		o.wrapper.setAttribute('invalid-yt-gif', '')
		console.log(
			`YT GIF: Couldn't find yt-gif component number ${
				o.accUrlIndex + 1
			} within the block ((${o.uid}))`
		)
		return true
	}
	return false
}
export function CreateYTGIFElement(o: {
	wrapper: HTMLElement
	customSpan: s

	targetClass: string
	dataCreation: string

	url: string
	accUrlIndex: number
	newId: string
}) {
	let wrapper = o.wrapper

	if (wrapper.tagName != 'DIV') {
		wrapper = ChangeElementType(wrapper, 'div')
	}

	wrapper.parentElement?.classList.add(`${cssData.yt_gif_wrapper}-parent`)
	wrapper.className = `${cssData.yt_gif_wrapper} dont-focus-block`

	if (o.customSpan) {
		wrapper.style.setProperty(
			'--yt-gif-player-span',
			parseFloat(o.customSpan) + '%'
		)
	}

	wrapper.setAttribute(attrInfo.target, o.targetClass)
	wrapper.setAttribute(attrInfo.creation.name, o.dataCreation)
	wrapper.setAttribute(attrInfo.url.path, o.url)
	wrapper.setAttribute(attrInfo.url.index, o.accUrlIndex.toString())
	// FIXME: window
	//wrapper.innerHTML = ''
	//wrapper.insertAdjacentHTML('afterbegin', links.html.fetched.playerControls)
	debugger
	wrapper.querySelector('.yt-gif-player')!.id = o.newId
	return wrapper
}
export function AsyncDeployment(dataCreation: string) {
	return (
		dataCreation == attrInfo.creation.forceAwaiting ||
		isInput_selectedValid()
	)
}

import { lastBlockIDParameters } from '$v3/lib/types/config'
import { toggleClasses, removeIMGbg, simHover, applyIMGbg } from '$lib/utils'
import { isSelected } from '$v3/lib/backend-frontend/option'
import { cssData } from '$v3/init/config/paths'
import { UIStore } from '$v3/init/config/UIStore'
import { isRendered } from '$v3/lib/dom/elements-yt-gif-parent'
import type { IExtendedVideoParams } from '$v3/lib/types/video-types'
import { AssertParamsClickTimestamp } from '../observer/timestamp-recovery/click'

// 8.0
export function DeployAsync(
	{
		getLocalBlockID,
		setObsTimestamp,
		getCrrContainer,
		getObsTimestamp,
	}: ILocalWrapper,
	o: {
		wrapper: HTMLElement
		url: s
		configParams: IExtendedVideoParams
		deploy: () => void
	}
) {
	const { wrapper, url, configParams, deploy } = o

	const mainAnimation = setUpWrapperAwaitingAnimation()

	const { awaiting_input_type } = UIStore.get().experience
	let interactionType =
		awaiting_input_type.value == 'mousedown' ? 'mousedown' : 'mouseenter' // huga buga

	AddInteractionEventListener()

	wrapper.addEventListener('customPlayerReady', CustomListener)

	awaiting_input_type.addEventListener('change', changeMouseEvents)

	function CustomListener(e: CustomEvent) {
		return Create(e, HandleDetailEvent)
	}
	function MouseListener(e: Event) {
		return Create(e, HandleMouseEvent)
	}

	async function Create(e: Event | CustomEvent, Work_cb: Function) {
		e.preventDefault()
		e.stopPropagation()

		toggleClasses(false, mainAnimation, wrapper)
		removeIMGbg(wrapper)

		RemoveAllListeners()

		await Work_cb(e)

		deploy()
	}

	async function HandleMouseEvent() {
		await AssertParamsClickTimestamp(
			{ getCrrContainer, getObsTimestamp },
			configParams
		)
		wrapper.dispatchEvent(simHover())
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function HandleDetailEvent(e: CustomEvent<ICustomPlayerReady>) {
		if (!e.detail || typeof e.detail !== 'object') {
			return
		}

		trySet('start')

		trySet('end')

		lastBlockIDParameters.delete(getLocalBlockID()) // YIKES!!!
		trySet('updateTime')

		trySet('mute')
		trySet('playRightAway')

		setObsTimestamp({
			...e.detail.obsTimestamp,
			workflow: 'soft',
		})
		configParams.updateTime.set(
			isBounded(get('updateTime'))
				? get('updateTime')
				: get(e.detail.page as 'start' | 'end')
		)

		function get(key: TExchange) {
			return configParams[key].value as number
		}
		// prettier-ignore
		type TExchange = 'start' | 'end' | 'updateTime' | 'mute' | 'playRightAway'
		function trySet(key: TExchange) {
			// @ts-ignore come on!
			configParams[key].set((crr: n | b) => e.detail[key] ?? crr)
		}
		function isBounded(t: n) {
			return t >= get('start') && t <= get('end')
		}
	}

	function RemoveAllListeners() {
		RemoveInteractionEventListener()
		// @ts-ignore come on!
		wrapper.removeEventListener('customPlayerReady', CustomListener)

		awaiting_input_type.removeEventListener('change', changeMouseEvents)
	}
	function ReplaceInteractionEventListener(listener = interactionType) {
		RemoveInteractionEventListener()
		AddInteractionEventListener((interactionType = listener))
	}
	function AddInteractionEventListener(listener = interactionType) {
		wrapper.addEventListener(listener, MouseListener)
	}
	function RemoveInteractionEventListener() {
		wrapper.removeEventListener(interactionType, MouseListener)
	}
	function changeMouseEvents(this: HTMLSelectElement) {
		if (!isRendered(wrapper)) {
			return RemoveAllListeners()
		}
		ReplaceInteractionEventListener(this.value)
	}

	function setUpWrapperAwaitingAnimation() {
		const {
			awiting_player_pulse_anim,
			awaitng_player_user_input,
			awaitng_input_with_thumbnail,
		} = cssData
		const awaitingAnimation = [
			awiting_player_pulse_anim,
			awaitng_player_user_input,
		]
		const awaitingAnimationThumbnail = [
			...awaitingAnimation,
			awaitng_input_with_thumbnail,
		]

		const mainAnimation = awaitingAnimationThumbnail

		if (isSelected(UIStore.get().experience.xp_options, 'thumbnail_as_bg'))
			applyIMGbg(wrapper, url)

		toggleClasses(true, mainAnimation, wrapper)
		return mainAnimation
	}
}

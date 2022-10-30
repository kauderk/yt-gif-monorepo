import { sleep, isRendered } from '$lib/utils'

/* eslint-disable @typescript-eslint/no-explicit-any */
const NotImplementationWarning = <R extends unknown>(): R => {
	console.warn('Not implemented')
	return <R>{}
}
export class T_YT_RECORD {
	wTarget: YT_TargetWrapper | undefined
	constructor(wTarget?: YT_TargetWrapper) {
		this.wTarget = wTarget
	}
	uid: string = ''
	seekToUpdatedTime: (desiredTime: number) => void = NotImplementationWarning
	sameBoundaries: () => boolean = NotImplementationWarning
	isSoundingFine: (bol: boolean) => void = NotImplementationWarning
	togglePlay: (bol: boolean) => void = NotImplementationWarning
	bounded: (sec: number) => boolean = NotImplementationWarning
}
export interface YT_IFRAME {
	readonly target: unknown
	readonly wTarget: YT_TargetWrapper
	readonly data: number
}
export class YT_TargetWrapper {
	private t: any
	ytgif: m

	constructor(target: any) {
		this.t = target
		target.ytgif ??= new m()
		this.ytgif = target.ytgif
	}
	GetIframeID: FString = () =>
		this.t.i?.id || this.t.g?.id || this.t.getIframe()?.id
	GetVideoID: FString = () => this.t.j.i.videoId
	GetVars: () => {
		start: number
		end: number
	} = () => this.t.j.i.playerVars
	// any should do, because sometimes it holds
	ApiIsWorking: () => Function | undefined = () => this.t.seekTo
	WhileApiHolds = async (iframe: QrySearch, delay = 500) => {
		while (isRendered(iframe) && isNaN(this.t?.getCurrentTime?.())) {
			await sleep(delay)
		}
	}
	DestroyTarget() {
		if (!this.t) return
		this.ytgif.enter = () => {
			/* empty */
		}
		this.t.destroy()
	}

	loadVideoById: (detail: {}) => Promise<void> = o => this.t.loadVideoById(o)

	getDuration: FNumber = () => this.t.getDuration()

	setVolume: (vol: number) => void = (n: n) => this.t.setVolume(n)
	getVolume: FNumber = () => this.t.getVolume()

	seekTo: (sec: number) => void = (n: n) => this.t.seekTo(n)
	getCurrentTime: FNumber = () => this.t.getCurrentTime()

	getPlayerState: FNumber = () => this.t.getPlayerState()
	setPlaybackRate: (rate: number) => void = (n: n) =>
		this.t.setPlaybackRate(n)

	setOnStateChange(cb: TSetStageChange): void {
		this.t.m.i[5] = cb
	}
	getPlaybackRate: FNumber = () => this.t.getPlaybackRate()
	setPlayerState: (state: string) => void = (s: string) =>
		(this.t.playerInfo.playerState = s)

	playVideo: FVoid = () => this.t.playVideo()
	pauseVideo: FVoid = () => this.t.pauseVideo()
	unMute: FVoid = () => this.t.unMute()
	mute: FVoid = () => this.t.mute()

	getIframe: () => HTMLIFrameElement = () => this.t.getIframe()
	destroy: FVoid = () => this.t.destroy()
	getAvailablePlaybackRates: () => number[] = () =>
		this.t.getAvailablePlaybackRates()
}
type TSetStageChange = (state: YT_IFRAME) => Promise<void>
class m {
	previousTick = 0
	timers = Array<number>()
	timerID = 0
	globalHumanInteraction = false
	ClearTimers() {
		window.clearInterval(this.timerID)
		this.timerID = 0

		if (this.timers.length != 0) {
			for (const tmr of this.timers) {
				clearInterval(tmr)
			}

			this.timers = []
		}
	}
	PushSingleInterval(cb: () => void, delay = 1000) {
		this.ClearTimers()
		this.timerID = window.setInterval(cb, delay)
		this.timers.push(this.timerID)
	}
	enter() {
		/*NewIntervalUpdate*/
	}
}

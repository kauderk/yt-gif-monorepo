import { cssData } from '../paths'
import { ObserveIframesAndDelployYTPlayers } from '../../observer/yt-gif'
import { UI } from '../yt-gif-init'
import { SrrGlobal } from '$lib/global/SrrGlobal'

function pushMasterObserverWithTargetClass(classToObserve: string) {
	SrrGlobal.YT_GIF_OBSERVERS.masterMutationObservers.push(
		ObserveIframesAndDelployYTPlayers(classToObserve)
	)
}
interface IDeploy {
	BinaryDomUI: () => HTMLInputElement
}
interface IObserve {
	classToObserve: string
}
const deploy = {
	deploymentStyle: function (this: IDeploy): boolean {
		return this.BinaryDomUI().checked
	},
	checkSubDeploymentStyle: function (this: IDeploy, bol: boolean) {
		this.BinaryDomUI().checked = bol
	},
}
const base = {
	...deploy,
	runMasterObservers: function (this: IObserve) {
		pushMasterObserverWithTargetClass(this.classToObserve)
	},
}
const rm_base = {
	video: {
		description: '{{[[video]]}}',
		classToObserve: 'rm-video-player__spacing-wrapper',
	},
	yt_gif: {
		description: '{{[[yt-gif]]}}',
		classToObserve: `rm-xparser-default-${cssData.yt_gif}`,
	},
}
export const targets = {
	video: {
		...base,
		...rm_base.video,
		page: 'video' as TGifTarget,
		BinaryDomUI: () => UI.deploymentStyle.deployment_style_video,
	},
	yt_gif: {
		...base,
		...rm_base.yt_gif,
		page: 'yt-gif' as TGifTarget,
		BinaryDomUI: () => UI.deploymentStyle.deployment_style_yt_gif,
	},
	both: {
		...deploy,
		description: `${rm_base.video.description} and ${rm_base.yt_gif.description}`,
		classToObserve: null as never,
		classesToObserve: [
			rm_base.video.classToObserve,
			rm_base.yt_gif.classToObserve,
		],
		BinaryDomUI: () => UI.deploymentStyle.deployment_style_both,
		runMasterObservers: function () {
			this.classesToObserve.forEach(c =>
				pushMasterObserverWithTargetClass(c)
			)
		},
	},
	yt_gif_tut: {
		classToObserve: 'yt-gif-ddm-tutorial' /* TESTING */,
	},
}

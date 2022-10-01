const players = {
	youtube: {
		player: () =>
			document.querySelector(
				'ytd-app:not([guide-persistent-and-visible]) #movie_player > div.html5-video-container > video'
			),
		playPauseBtn: () =>
			document.querySelector(
				'ytd-watch-flexy #movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button'
			),
	},
	yt_music: {
		player: () =>
			document.querySelector('ytmusic-player-page #movie_player'),
		playPauseBtn: () => document.querySelector('#play-pause-button'),
	},
	skillshare: {
		player: () => document.querySelector('#vjs_video_3_html5_api'),
		playPauseBtn: () => document.querySelector('.vjs-play-control'),
	},
	spotify: {
		player: () =>
			document.querySelector('div.VideoPlayer__container > video'),
		playPauseBtn: () =>
			document.querySelector('button[data-testid*="playpause"]'),
	},
	getAnyValidPlayer: function () {
		return this.stupidity<HTMLVideoElement>('player')
	},
	getAnyValidPlayPauseBtn: function () {
		return this.stupidity<HTMLButtonElement>('playPauseBtn')
	},
	stupidity: function <T = HTMLElement>(cb_name: string): T {
		let val = <T>{}
		const ObjKeysAsArr = <obj extends o>(o: obj) =>
			Object.keys(o) as (keyof typeof o)[]
		//@ts-ignore
		const media = ObjKeysAsArr(this).filter(k => this[k].player())
		//@ts-ignore
		media.find(name => (val = this[name][cb_name]()))
		return val
	},
}

export default players

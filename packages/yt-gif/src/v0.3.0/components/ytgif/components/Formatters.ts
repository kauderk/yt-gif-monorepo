export default <const>{
	// ytgif
	restoreUrl: {
		tooltip: 'Restore YT URL',
		placement: 'left',
		on: 'link-45deg',
		data: { 'data-btn': 'url' },
		self: true,
	},
	startEnd: {
		tooltip: '{{[[start|end]]}}',
		placement: 'top',
		on: 'align-center',
		data: { 'data-btn': 'start|end' },
		self: true,
	},
	start: {
		tooltip: '{{[[start]]}}',
		placement: 'top',
		on: 'skip-end',
		data: { 'data-btn': 'start' },
	},
	end: {
		tooltip: '{{[[end]]}}',
		placement: 'top',
		on: 'skip-start',
		data: { 'data-btn': 'end' },
	},
	// timestamp
	ytgif: {
		tooltip: '{{[[yt-gif]]}}',
		placement: 'right',
		on: 'play-btn',
		data: { 'data-btn': 'yt-gif' },
	},
	swapFormats: {
		tooltip: 'Swap Formats',
		placement: 'right',
		on: 'arrow-repeat',
		data: { 'data-btn': 'swap' },
		self: true,
	},
}

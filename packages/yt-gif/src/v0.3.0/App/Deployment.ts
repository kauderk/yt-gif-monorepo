export const menu = <const>{
	name: 'Deployment Style',
	'data-tooltip': 'Look for components to create YT GIFs',
}
export const tuts = <const>{
	hide: { name: 'Hide' },
	deployments: {
		name: 'Deployments',
		'data-tooltip': 'Deploy selected YT GIFs',
	},
}
export const featuresOptions = <const>{
	id: 'tm_options',
	options: {
		ytgif: {
			name: '{{[[yt-gif]]}}',
			'data-tooltip': '...',
			selected: true,
		},
		video: {
			name: '{{[[video]]}}',
			'data-tooltip': '...',
		},
		both: {
			name: '{{[[yt-gif]]}} and {{[[video]]}}',
			'data-tooltip': '...',
		},
	},
}

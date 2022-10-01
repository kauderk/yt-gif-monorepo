export const theme = <const>{
	name: 'Toggle Theme',
	on: 'palette-fill',
	off: 'palette',
	tooltip: 'Theme: Dark - or - Light',
	type: 'check',
	propagation: true,
	customization: {
		on: 'gear',
		tooltip: 'Customization',
		type: 'check',
	},
}
export const toggles = <const>{
	question: {
		name: 'Frequently Asked Questions',
		on: 'folder-symlink',
		tooltip: 'Frequently Asked Questions - kauderk.github.io/yt-gif-faq',
	},
	sidebar: {
		name: 'Settings Page',
		on: 'layout-sidebar-reverse',
		off: 'layout-sidebar-inset-reverse',
		tooltip:
			"YT GIF Settings page instance already open within the Sidebar. It's purpose is to check values. Change them using this menu.",
	},
}
export const subs = {
	info: {
		on: 'info-circle',
		tooltip: 'Show Info',
	},
	bookmark: { on: 'bookmark', tooltip: 'YT GIF Extension Updates' },
}
export type TIcon = {
	on: s
	off?: s
	type?: 'toggle' | 'check'
	tooltip: s
}

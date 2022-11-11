export type states =
	| 'leftSidebar'
	| 'rightSidebar'
	| 'fullGraph'
	| 'theater'
	| 'list'
	| 'blocks'
	| 'leftVideo'
	| 'rightVideo'
	| 'topVideo'
	| 'bottomVideo'
	| ''

export type TView = {
	[key in states]?: any
} & {
	active: states
	previous: states
}

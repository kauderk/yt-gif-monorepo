export type states =
	| 'Explorer'
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
	| 'Layouts'
	| ''

export type TView = {
	[key in states]?: any
} & {
	active: states
	previous: states
}

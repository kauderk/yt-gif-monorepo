export interface TStat {
	start: number
	end: number
	volume: number
}
export interface ILocal {
	entry: Readonly<
		TStat & {
			blockID: string
			blcokID_prfx: string

			canBeCleanedByBuffer: boolean
			key: string
		}
	>
	update: TStat & { tickOffset: number }
}

import { fmtTimestamp } from '../../timestamp/utils'

// 7.0 display
export function ChangeTimestampsDisplay(value: keyof Itime) {
	const fmt = fmtTimestamp(value)

	document
		.queryAllasArr<HTMLElement>('[yt-gif-timestamp-emulation]')
		.forEach(_tms => {
			const tms = _tms as IBtn
			if (!value)
				// Default?
				return (tms.a.textContent =
					tms.getAttribute('timestamp') ?? tms.a.textContent)
			tms.a.textContent = fmt(tms.a.textContent as s)
		})
}

export async function ClickResetWrapper(
	targetWrapper: QrySearch,
	assignObj: TResetYTEvent | null = null
) {
	if (!targetWrapper) return

	const reset = targetWrapper.querySelector(
		'[yt-gif-url-btn="reset"]'
	) as HTMLResetBtn

	if (assignObj && 'delete-obs-tm' in assignObj)
		// alright
		reset.dispatchEvent(
			new CustomEvent('customDelObsTimestmp', {
				bubbles: true,
				cancelBubble: true,
				cancelable: true,
				detail: {
					blockID: assignObj.blockID,
				},
			})
		)

	await reset?.ResetBoundaries_smart?.(assignObj)
}

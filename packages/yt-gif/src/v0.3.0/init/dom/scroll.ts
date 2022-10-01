export function UpdateOnScroll_RTM(scroll: HTMLInputElement) {
	const labelEl = scroll.nextElementSibling!
	labelEl.textContent = scroll.value // don't fire rendundant API calls on startup

	// 📦
	scroll.addEventListener(
		'click',
		e => UptLabel(e.currentTarget as HTMLInputElement),
		true
	)
	scroll.addEventListener('wheel', e => UptLabel(SliderValue(e)), true)

	function SliderValue(e: WheelEvent) {
		const elScroll = e.currentTarget as HTMLInputElement // fuck this
		const dir = Math.sign(e.deltaY) * -1
		const parsed = parseInt(elScroll.value, 10)
		elScroll.value = Number(dir + parsed).toString()
		return elScroll
	}
	function UptLabel(elScroll: HTMLInputElement) {
		labelEl.textContent = elScroll.value // don't worry about overflowing the counter, html range takes care of it
		elScroll.dispatchEvent(new Event('change'))
	}
}

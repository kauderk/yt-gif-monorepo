import { toggleAttribute, toggleClasses } from '$lib/utils'

type classes = { selected: string }
interface Args {
	fakeSel: HTMLSelectElement
	classes?: classes
}
export default class CustomSelect {
	classes: classes
	fakeSel: HTMLSelectElement
	customSelect: HTMLSelectElement

	constructor(_args: Args) {
		this.fakeSel = _args.fakeSel
		this.classes = _args.classes || { selected: 'selected' }

		this.customSelect = document.createElement('select')

		if (this.fakeSel.hasAttribute('multiple'))
			this.customSelect.setAttribute('multiple', '')

		this._removeFakeSibling()

		for (const fake of this._getArrayChildrenOptions()) {
			const option = document.createElement('option') // binded to the fake select

			option.setAttribute('value', fake.getAttribute('value')!) // could be null
			option.textContent = fake.textContent
			this.customSelect.appendChild(option)

			if (fake.hasAttribute('selected')) this._select(fake)

			const handleSelect = () => {
				if (fake.hasAttribute('disabled') || option.disabled) return

				const previous = option.selected
				if (
					this.fakeSel.hasAttribute('multiple') &&
					(fake.hasAttribute('selected') || option.selected)
				) {
					this._deselect(fake)
					this._fireCustomChange(option, false, previous)
				} else {
					this._select(fake)
					this._fireCustomChange(option, true, previous)
				}
				this.customSelect.dispatchEvent(new Event('change'))
			}
			const customSelect = (bol: boolean) => {
				if (bol) this._select(fake)
				else this._deselect(fake)
				this.customSelect.dispatchEvent(new Event('customBind'))
			}

			fake.addEventListener('click', handleSelect.bind(this))
			option.customSelect = customSelect.bind(this)
			option.customHandleSelect = handleSelect.bind(this)
			option.fake = fake
		}

		this.fakeSel.insertAdjacentElement('afterend', this.customSelect)
		this.customSelect.style.display = 'none'
		this.customSelect.setAttribute('hidden-fake-select', '')
	}
	_output() {
		return <const>{
			select: this.customSelect,
			originalSelect: this.fakeSel,
		}
	}

	_removeFakeSibling() {
		// if exist
		if (this.fakeSel.nextElementSibling?.hasAttribute('hidden-fake-select'))
			this.fakeSel.parentNode?.removeChild(
				this.fakeSel.nextElementSibling
			)
	}
	_getArrayChildrenOptions() {
		return Array.from(this.fakeSel.children as HTMLOptionsCollection)
	}
	_select(fake: HTMLOptionElement) {
		if (!this.fakeSel.hasAttribute('multiple'))
			this._getArrayChildrenOptions().forEach(el =>
				this._vsSelected(false, el)
			)

		this._isSelected(true, fake)
		this._vsSelected(true, fake)
	}
	_deselect(fake: HTMLOptionElement) {
		this._isSelected(false, fake)
		this._vsSelected(false, fake)
	}
	_vsSelected(bol: boolean, el: HTMLElement) {
		toggleAttribute(bol, 'selected', el)
		if (this.classes.selected)
			toggleClasses(bol, [this.classes.selected], el)
	}
	_isSelected(bol: boolean, fake: HTMLOptionElement) {
		const index = this._getArrayChildrenOptions().indexOf(fake)
		const option = <HTMLOptionElement>this.customSelect.children[index]
		option.selected = bol
	}
	_fireCustomChange(
		option: HTMLElement,
		bol: boolean,
		previousValue = false
	) {
		if (previousValue != bol)
			// nothing changed, skip
			option.dispatchEvent(
				new CustomEvent('customChange', {
					bubbles: false,
					cancelBubble: true,
					cancelable: true,
					//composed: false,
					detail: {
						previousValue,
						currentValue: bol,
					},
				}) as ICustomChangeEvent
			)
	}
}
export interface ICustomChangeEvent
	extends CustomEvent<{
		previousValue: boolean
		currentValue: boolean
	}> {
	currentTarget: HTMLOptionElement
	target: HTMLOptionElement
}

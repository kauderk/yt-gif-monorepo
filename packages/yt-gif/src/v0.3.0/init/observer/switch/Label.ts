import { deployInfo } from './InputGate'

/* ****************** */
export function Label(labelCheckMenu: El) {
	labelCheckMenu.textContent = deployInfo.suspend
	function sameLabel(str: s) {
		return labelCheckMenu.textContent == str
	}
	function setText(str: s) {
		return (labelCheckMenu.textContent = str)
	}
	return <const>{ sameLabel, setText }
}

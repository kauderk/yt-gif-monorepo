import { toggleClasses } from '$lib/utils'
import type { ICheckboxes} from './InputGate';
import { noInputAnimation } from './InputGate'

export function Check(deploy: ICheckboxes) {
	function disable(b: b) {
		Object.values(deploy).forEach(check => (check.disabled = b))
	}
	function check(b: b) {
		Object.values(deploy).forEach(check => (check.checked = b))
	}
	function DeployCheckboxesToggleAnims(bol: b, animation: s[]) {
		toggleClasses(bol, animation, deploy.menu.parentElement!)
		toggleClasses(bol, noInputAnimation, deploy.menu.parentElement!)
	}
	function HoldInputFor10Secs(animation: s[], duration = 10000) {
		return new Promise(function (resolve: Function) {
			disable(true)
			check(false)
			DeployCheckboxesToggleAnims(true, animation)

			setTimeout(() => {
				disable(false)
				check(false)
				DeployCheckboxesToggleAnims(false, animation)
				resolve()
			}, duration)
		})
	}
	return <const>{ HoldInputFor10Secs }
}

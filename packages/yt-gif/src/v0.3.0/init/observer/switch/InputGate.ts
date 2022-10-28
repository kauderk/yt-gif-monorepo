import { cssData } from '../../config/paths'
import { rm_components } from '../../config/driver'
import type { Check } from './Check'
import type { Label } from './Label'
import type { Show } from './Show'
import { SrrGlobal } from '$lib/global/SrrGlobal'

// 1.1
export const deployInfo = {
	suspend: `Suspend Observers`,
	deploy: `Deploy Observers`,
	discharging: `** Disconecting Observers **`,
	loading: `** Setting up Observers **`,
}
export interface ICheckboxes {
	menu: HTMLInputElement
	sub: HTMLInputElement
}
const { dwn_no_input } = cssData
export const noInputAnimation = [dwn_no_input]
// 1.1.1
export function InputGate(
	deploy: ICheckboxes,
	{
		setText,
		sameLabel,
		visualFeedback,
		HoldInputFor10Secs,
	}: ReturnType<typeof Label> &
		ReturnType<typeof Show> &
		ReturnType<typeof Check>
) {
	const {
		dropdown_fadeIt_bg_animation,
		dropdown_forbidden_input,
		dropdown_allright_input,
	} = cssData
	const baseAnimation = [dropdown_fadeIt_bg_animation, ...noInputAnimation]
	const redAnimationNoInputs = [...baseAnimation, dropdown_forbidden_input]
	const greeAnimationInputReady = [...baseAnimation, dropdown_allright_input]

	async function redCombo() {
		setText(deployInfo.discharging)
		visualFeedback(false)
		SrrGlobal.YT_GIF_OBSERVERS.CleanMasterObservers()
		await HoldInputFor10Secs(redAnimationNoInputs) //showing the red animation, because you are choosing to suspend
		setText(deployInfo.deploy)
	}

	// 1.1.2
	async function greenCombo() {
		rm_components.ChargeMasterObserversWithValidDeploymentStyle()
		setText(deployInfo.loading) //change label to suspend
		visualFeedback(true)
		await HoldInputFor10Secs(greeAnimationInputReady)
		setText(deployInfo.suspend)
	}
	async function OnInputFlow() {
		if (!deploy.menu.checked) {
			return
		}
		if (sameLabel(deployInfo.suspend)) {
			// 1.1.1
			await redCombo() //after the 10 seconds allow inputs again
		} else if (sameLabel(deployInfo.deploy)) {
			// 1.1.2
			await greenCombo()
		}
	}
	// 2.1
	async function OnSubmit() {
		if (deploy.sub.checked && sameLabel(deployInfo.deploy)) {
			await greenCombo()
		}
	}
	return <const>{ OnInputFlow, OnSubmit }
}

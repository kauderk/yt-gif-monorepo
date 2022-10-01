import { UI } from '../../config/yt-gif-init'
import { InputGate } from './InputGate'
import { Label } from './Label'
import { Show } from './Show'
import { Check } from './Check'

//#region 4. BIG BOI FUNCTION - change the functionality of the extension
export async function MasterObserver_UCS_RTM() {
	const checkboxes = {
		menu: UI.deploymentStyle.suspend_yt_gif_deployment,
		sub: UI.deploymentStyle.deploy_yt_gifs,
	}

	const label = checkboxes.menu.previousElementSibling!

	const local = Label(label)
	const show = Show()
	const checkbox = Check(checkboxes)

	const input = InputGate(checkboxes, { ...local, ...show, ...checkbox })

	checkboxes.menu.addEventListener('change', input.OnInputFlow)
	checkboxes.sub.addEventListener('change', input.OnSubmit)
}

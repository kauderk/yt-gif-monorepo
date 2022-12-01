import { UIStore } from '$v3/init/config/UIStore'
import { InputGate } from './InputGate'
import { Label } from './Label'
import { Show } from './Show'
import { Check } from './Check'

//#region 4. BIG BOI FUNCTION - change the functionality of the extension
export async function MasterObserver_UCS_RTM() {
	throw new Error('Unable to Listen and change the yt-gif targets')
	const checkboxes = {
		menu: UIStore.get().deploymentStyle.suspend_yt_gif_deployment,
		sub: UIStore.get().deploymentStyle.deploy_yt_gifs,
	}

	const label = checkboxes.menu.previousElementSibling!

	const local = Label(label)
	const show = Show()
	const checkbox = Check(checkboxes)

	const input = InputGate(checkboxes, { ...local, ...show, ...checkbox })

	checkboxes.menu.addEventListener('change', input.OnInputFlow)
	checkboxes.sub.addEventListener('change', input.OnSubmit)
}

import { inViewportElsHard } from '$lib/utils'
import { Mutation_cb_raw_rm_cmpts } from '../../../lib/backend-frontend/mutation'
import { Local, DeployPlayer, PlayerOnIntersection } from './query'

export function ObserveIframesAndDelployYTPlayers(targetClass: string) {
	// set up all visible YT GIFs
	const local = Local(targetClass)

	// deploy all visible
	inViewportElsHard(local.validTemplates()).forEach(wrapper =>
		DeployPlayer({ wrapper, message: 'first wave', targetClass })
	)

	// to deploy when visible
	local.validTemplates().forEach(wrapper =>
		window.YT_GIF_OBSERVERS.masterIntersectionObservers.push(
			PlayerOnIntersection({
				wrapper,
				message: 'second wave',
				targetClass,
			})
		)
	)

	// 3. observe and deploy on intersection
	const observer = new MutationObserver(async mutations =>
		Mutation_cb_raw_rm_cmpts(mutations, targetClass, local.OnRendered)
	)
	observer.observe(document.body, { childList: true, subtree: true })

	return observer
}

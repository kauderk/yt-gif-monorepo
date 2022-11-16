<!-- 
	https://nickheal.github.io/pair-programmer/
	https://github.com/vujovicigor/quiz-mongo/blob/main/front/src/utils/Tour.svelte
	https://cookietrack.io/dashboard/
 -->
<script context="module" lang="ts">
	import { get, writable } from 'svelte/store'

	type step = string
	type steps = step[]
	const steps = writable(new Array<step>())
	const selectors = writable(new Array<string>())

	let step = 0
	export function startTour(o: { message?: s; step?: n }) {
		step = o.step ?? 0
		steps.set([o.message ?? '', ...get(selectors)].filter(s => !!s))
	}

	export function register(targetNode: HTMLElement, message: string) {
		targetNode.setAttribute('data-tour', message)
		selectors.set([...get(selectors), message])
	}
</script>

<script lang="ts">
	import { crossfade, fly } from 'svelte/transition'

	let currentStepPos = step
	let stepOnStage: steps = []
	let promptPos = ''

	const promptTransition = { key: {}, duration: 100, y: -8 }
	const spotlightTransition = { key: {}, duration: 100 }

	$: $steps.length && start()

	function start() {
		if (!$steps || !$steps.length) return

		startStep(step)
	}

	function startStep(stepPos: number) {
		if (stepPos >= $steps.length || stepPos < 0) {
			reset()
			return
		}

		currentStepPos = stepPos

		const step = $steps[currentStepPos]

		getTourNode(step)?.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center',
		})

		stepOnStage = [step]
	}
	function getTourNode(step: string) {
		return document.querySelector(`[data-tour="${step}"]`)
	}

	function reset() {
		steps.set([])
		currentStepPos = step
		stepOnStage = []
	}

	function onNext() {
		startStep(++currentStepPos)
	}

	function onBack() {
		startStep(--currentStepPos)
	}

	function onSkip() {
		reset()
	}
	let hole = { x: 0, y: 0 }

	function tourAction(node: HTMLElement, step: step) {
		type x = HTMLElement // alright...
		const promptNode = node.querySelector('.tour-prompt') as x
		const spotlightNode = node.querySelector('.tour-spotlight') as x
		const arrowNode = node.querySelector('.tour-arrow') as x
		const bodyNode = node.querySelector('.tour-body') as x
		const promptStyle = promptNode.style
		const spotlightStyle = spotlightNode.style
		const arrowStyle = arrowNode.style

		function getNum(str: s) {
			return parseInt(str) || 0
		}

		function updatePos() {
			const targetNode = getTourNode(step)
			if (targetNode) {
				// set prompt position
				const promptRect = promptNode.getBoundingClientRect()
				const targetRect = targetNode.getBoundingClientRect()

				if (
					targetRect.bottom + promptRect.height + 5 <
					document.body.clientHeight
				) {
					promptStyle.top = `${targetRect.bottom}px`
					promptStyle.bottom = ''
					promptPos = ''
				} else {
					promptStyle.bottom = `${
						document.body.clientHeight - targetRect.top
					}px`
					promptStyle.top = ''
					promptPos = 'top'
				}

				if (
					targetRect.left + promptRect.width + 5 <
					document.body.clientWidth
				) {
					promptStyle.left = `${targetRect.left}px`
					promptStyle.right = ''
					promptStyle.marginLeft = promptStyle.marginRight = ''
				} else {
					promptStyle.right = '0'
					promptStyle.left = ''
					promptStyle.marginLeft = promptStyle.marginRight = '5px'
				}

				// set arrow position
				const pStyle = getComputedStyle(promptNode)
				const aStyle = getComputedStyle(arrowNode)
				arrowStyle.left =
					targetRect.width / 2 +
					targetRect.left -
					getNum(pStyle.left) -
					getNum(pStyle.marginLeft) -
					getNum(aStyle.borderLeftWidth) +
					'px'

				hole = {
					x: targetRect.left - targetRect.width / 1.25,
					y: targetRect.top - targetRect.height / 1.25,
				}

				// set spotlight position
				spotlightStyle.top = `${targetRect.top}px`
				spotlightStyle.left = `${targetRect.left}px`
				spotlightStyle.width = `${targetRect.width}px`
				spotlightStyle.height = `${targetRect.height}px`
			} else {
				// set prompt to center
				const bodyRect = bodyNode.getBoundingClientRect()

				promptStyle.top = `${
					(document.body.clientHeight - bodyRect.height) / 2
				}px`
				promptStyle.left = `${
					(document.body.clientWidth - bodyRect.width) / 2
				}px`
				promptPos = 'center'
				hole = { x: -100, y: -100 }

				// set spotlight to center
				spotlightStyle.top = `${document.body.clientHeight / 2}px`
				spotlightStyle.left = `${document.body.clientWidth / 2}px`
				spotlightStyle.width = '0'
				spotlightStyle.height = '0'
			}
		}

		updatePos()
		window.addEventListener('scroll', updatePos)
		window.addEventListener('resize', updatePos)

		return {
			destroy() {
				window.removeEventListener('scroll', updatePos)
				window.removeEventListener('resize', updatePos)
			},
		}
	}

	// @ts-ignore
	const [send, receive] = crossfade({ fallback: fly })

	import MaskedBlur from './MaskedBlur.svelte'
</script>

{#if $steps.length}
	<div class="tour-backdrop">
		<MaskedBlur bind:cord={hole} />
		{#each stepOnStage as step (step)}
			<div use:tourAction={step}>
				<div
					class="tour-spotlight"
					in:receive={spotlightTransition}
					out:send={spotlightTransition} />
				<div
					class="tour-prompt"
					class:tour-prompt-top={promptPos === 'top'}
					class:tour-prompt-center={promptPos === 'center'}
					in:receive={promptTransition}
					out:send={promptTransition}>
					<div class="tour-arrow" />
					<div class="tour-body">
						<div class="tour-content">{step}</div>
						<div class="tour-footer">
							<div class="tour-footer-left">
								{#if currentStepPos < $steps.length - 1}
									<button on:click={onSkip}>Skip</button>
								{/if}
							</div>
							<div class="tour-footer-right">
								{#if currentStepPos !== 0}
									<button on:click={onBack}>Back</button>
								{/if}
								<button on:click={onNext}
									>{currentStepPos < $steps.length - 1
										? 'Next'
										: 'Done'}</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.tour-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 999999;
	}

	.tour-spotlight {
		position: fixed;
		box-shadow: 0 0 0 calc(999vw + 999vh) rgba(0, 0, 0, 0.5);
	}

	.tour-prompt {
		position: fixed;
		min-width: 15em;
		max-width: 25em;
	}

	.tour-arrow {
		position: absolute;
		margin-top: 0.1em;
		border-style: solid;
		border-width: 0 0.5em 0.5em 0.5em;
		border-color: #334 transparent;
	}

	.tour-body {
		margin-top: 0.6em;
		background: #334;
		color: #fff;
	}

	.tour-content {
		padding: 0.5em;
	}

	.tour-footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5em 0.25em;
	}

	.tour-footer-left {
		flex-grow: 1;
	}

	.tour-footer-left,
	.tour-footer-right {
		display: flex;
	}

	button {
		margin: 0 0.25em;
	}

	.tour-prompt.tour-prompt-top {
		display: flex;
		flex-direction: column-reverse;
	}

	.tour-prompt.tour-prompt-top > .tour-arrow {
		border-width: 0.5em 0.5em 0 0.5em;
		margin-top: 0;
		margin-bottom: 0.1em;
	}

	.tour-prompt.tour-prompt-top > .tour-body {
		margin-top: 0;
		margin-bottom: 0.6em;
	}

	.tour-prompt.tour-prompt-center > .tour-arrow {
		border-width: 0 0.5em;
		margin-top: 0;
		margin-bottom: 0;
	}

	.tour-prompt.tour-prompt-center > .tour-body {
		margin-top: 0;
		margin-bottom: 0;
	}
</style>

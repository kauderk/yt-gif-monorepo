<!--  Svelte port of React example: https://github.com/fireship-io/229-multi-level-dropdown -->
<script lang="ts">
	import DropdownMenu from './DropdownMenu.svelte'

	import Sub from '$v3/components/Sub/index.svelte'
	import Icon from '$v3/components/Icon.svelte'

	const icon = <const>{
		on: 'collection-play-fill',
		off: 'collection-play',
		tooltip: 'YT GIF Extension',
		placement: 'left'
	}
	function inject(target: HTMLElement) {
		// let top = document.querySelectorAll(
		// 	'.rm-topbar__spacer-sm:not(.ytgif-inject)'
		// )[5]

		// if (!top) {
		// 	top = document.body
		// 	console.warn(
		// 		'YT GIF Drop Down Menu Parent (document.body as fallback)'
		// 	)
		// }
		// top.insertAdjacentElement('afterend', target)

		return {
			destroy() {
				target.remove()
			}
		}
	}
</script>

<Sub persist={false} overlay={false} type="" {inject}>
	<Icon slot="top" {...icon} />
	<DropdownMenu />
</Sub>

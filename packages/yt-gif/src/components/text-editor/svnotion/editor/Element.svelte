<script>
	import {
		beforeUpdate,
		createEventDispatcher,
		onDestroy,
		onMount,
		tick,
	} from 'svelte'
	export let element
	export let editor
	const init = async () => {
		await tick()
		if (!editor || !editor.options.element) {
			return
		}
		if (editor.contentElement) {
			return
		}
		element.append(...Array.from(editor.options.element.childNodes))
		editor.setOptions({ element })
		editor.contentElement = element
	}
	onMount(init)
	beforeUpdate(init)
	onDestroy(() => {
		if (!editor) {
			return
		}
		editor.contentElement = null
		if (!editor.options.element.firstChild) {
			return
		}
		const newElement = document.createElement('div')
		newElement.append(...Array.from(editor.options.element.childNodes))
		editor.setOptions({
			element: newElement,
		})
	})
	const dispatch = createEventDispatcher()
</script>

<div
	bind:this={element}
	on:keydown|capture={e => dispatch('keydownCapture', e)} />

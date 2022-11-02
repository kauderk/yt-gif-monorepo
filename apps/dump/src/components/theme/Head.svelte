<script lang="ts">
	// https://dev.to/willkre/persistent-theme-switch-dark-mode-with-svelte-sveltekit-tailwind-1b9g
	import { browser } from '$app/environment'
	import Toggle from './Toggle.svelte'
	import { theme } from '@cmp/theme/store'

	let darkMode = true

	function handleSwitchDarkMode() {
		darkMode = !darkMode

		const opt = darkMode ? 'dark' : 'light'

		$theme = opt
		localStorage.setItem('theme', opt)

		SwitchDark(darkMode)
	}

	if (browser) {
		const isDark =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)

		SwitchDark(isDark)
		darkMode = isDark
	}

	function SwitchDark(b = darkMode) {
		document.documentElement.classList[b ? 'add' : 'remove']('dark')
	}
	export let id: null | string = null
</script>

<input
	{id}
	type="checkbox"
	class="toggle toggle-md"
	checked={darkMode}
	on:click={handleSwitchDarkMode} />

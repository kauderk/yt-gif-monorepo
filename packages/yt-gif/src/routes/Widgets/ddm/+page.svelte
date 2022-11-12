<script lang="ts">
	import DropdownMenu from '$v3/components/Dropdown/DropdownMenu.svelte'
	import { Detail } from '$v3/components/Sub/Flow'

	import Styles from 'src/styles/Styles.svelte'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	const detail = writable({ ...Detail, forceOpen: true })
	setContext('detail', detail)
</script>

<DropdownMenu />

<!-- FIXME: Shouldn't rely on extenal CSS -->
<Styles />

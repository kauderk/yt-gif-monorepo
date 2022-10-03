<script lang="ts">
	import {
		mdiClockTimeSevenOutline,
		mdiYoutubeStudio,
		mdiCogPlay,
		mdiTune,
		mdiExpandAllOutline,
		mdiInformation,
		mdiFolderPlay,
		mdiViewGridPlusOutline
	} from '@mdi/js'
	import Timestamps from '$v3/App/Timestamps.svelte'

	import { visit } from './types'

	$: active = 'main'
	$: previous = 'main'

	const go = (to = 'main') => {
		previous = active
		return (active = to)
	}

	const ppt = (o: Object) => ({
		key: Object.keys(o)[0],
		Sub: Object.values(o)[0],
		icon: Object.values(o)[1] || mdiYoutubeStudio,
		type: Object.keys(o)[2] ?? 'sub',
		visit: { ...visit }
	})
	const drops = [
		{
			key: 'Timestamps',
			icon: mdiClockTimeSevenOutline,
			Sub: Timestamps,
			type: 'sub',
			visit: { ...visit }
		}
	]
	const leaveOthers = (key: s) => {
		drops.filter(d => d.key != key).forEach(d => d.visit?.set(null))
		return ''
	}
</script>

<slot {active} {previous} {go} {drops} {leaveOthers} />

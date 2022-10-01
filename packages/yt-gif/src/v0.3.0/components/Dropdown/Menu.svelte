<script lang="ts">
	import {
		mdiClockTimeSevenOutline,
		mdiYoutubeStudio,
		mdiCogPlay,
		mdiTune,
		mdiExpandAllOutline,
		mdiInformation,
		mdiFolderPlay,
		mdiViewGridPlusOutline,
		//
		mdiChevronRight,
		// @ts-ignore
	} from '@mdi/js'
	import Timestamps from '../../App/Timestamps.svelte'
	import Observer from '$v3/App/Observer.svelte'
	import Experience from '$v3/App/Experience.svelte'
	import PlayerSettings from '$v3/App/PlayerSettings.svelte'
	import Miscellaneous from '$v3/App/Miscellaneous.svelte'
	import Info from '$v3/App/Footer/Info.svelte'
	import Updates from '$v3/App/Footer/Updates.svelte'
	import Settings from '$v3/App/Footer/Index.svelte'

	const ppt = (o: Object) => ({
		key: Object.keys(o)[0],
		Sub: Object.values(o)[0],
		icon: Object.values(o)[1] || mdiYoutubeStudio,
		type: Object.keys(o)[2] ?? 'sub',
	})
	export const menu = <const>[
		{
			key: 'Timestamps',
			icon: mdiClockTimeSevenOutline,
			Sub: Timestamps,
			type: 'sub',
		},
		{ ...ppt({ Observer, mdiYoutubeStudio }) },
		{ ...ppt({ Experience, mdiCogPlay }) },
		{ ...ppt({ PlayerSettings, mdiTune }) },
		{ ...ppt({ Miscellaneous, mdiExpandAllOutline }) },
		{ ...ppt({ Updates, mdiFolderPlay, footer: '' }) },
		{ ...ppt({ Info, mdiInformation, footer: '' }) },
		{ ...ppt({ Settings, mdiViewGridPlusOutline }) },
	]
</script>

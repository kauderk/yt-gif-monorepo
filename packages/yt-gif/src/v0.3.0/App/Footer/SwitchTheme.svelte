<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import MainOptinal from '$v3/components/MainOptional.svelte'
	import ColorPicker from './ColorPicker.svelte'

	import { theme } from '../Icons'
	import { ddm_item } from 'src/styles/roam-classes'

	import {
		themeStore,
		switchTheme,
		useDmmVars,
		useDdmVars,
		UpdateTheme,
	} from './ThemeStore'

	$: isDark = $themeStore.theme == 'dark'

	const click = (b: b) => {
		switchTheme(b ? 'dark' : 'light')
	}
	const _theme = { ...theme, selected: isDark, click }

	let checked: b
	let show: b
</script>

<div
	class={'btn-icon-main ' + ddm_item}
	on:click={() => click((show = $themeStore.theme == 'dark'))}>
	<Icon {..._theme} {show} propagation={true} />
	<span class="text-color-100">{_theme.name}</span>
	<Icon {..._theme.customization} bind:checked propagation={true} />
</div>

<!-- theme customization -->
{#if checked}
	<span class="w-full">
		<div>
			<!-- override host app css -->
			<MainOptinal
				id="use-ddm-vars"
				on:change={useDdmVars}
				bind:checked={$useDmmVars}>Override Default Theme</MainOptinal>
		</div>
		{#each Object.entries($themeStore.pallet) as [name, { color, accent }]}
			{#if name == $themeStore.theme}
				<!-- Render current theme options -->
				<ColorPicker {name} bind:color on:change={UpdateTheme} />
				<ColorPicker
					name="accent"
					bind:color={accent}
					on:change={UpdateTheme} />
			{/if}
		{/each}
	</span>
{/if}

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 8px;
		align-items: center;
		transition: background var(--speed);

		width: 100%;
	}
	.w-full div {
		font-size: 0.8em;
		grid-template-columns: initial;
		justify-items: center;
		:global(*) {
			border: none !important;
			font-weight: normal;
		}
	}
</style>

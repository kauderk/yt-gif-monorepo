<script lang="ts">
	import Icon from '$v3/components/Icon.svelte'
	import SwitchTheme from './SwitchTheme.svelte'

	import { toggles } from '../Icons'
	import { ddm_item } from 'src/styles/roam-classes'
</script>

<SwitchTheme />

{#each Object.values(toggles) as o}
	<div class={ddm_item}>
		<span class="btn-icon-main">
			<Icon {...o} />
		</span>
		<span class="text-color-100">{o.name}</span>
	</div>
{/each}

<style lang="scss">
	div {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 8px;
		align-items: center;
		transition: background var(--speed);

		width: 100%;
	}
</style>

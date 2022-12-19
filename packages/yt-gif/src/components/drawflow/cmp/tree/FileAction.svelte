<script lang="ts">
	export let active: b
	/**
	 * Font Awesome
	 */
	export let iconName: s
	const toggle = (b: b) => (b ? 'duotone' : 'thin')
</script>

<button class="btn btn-square btn-ghost btn-xs" on:click>
	<i class="fa-{toggle(active)} fa-{iconName}" />
</button>

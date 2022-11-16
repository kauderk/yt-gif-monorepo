<script>
	export let layout = ''
	export let value = ''
	export let chip = ''
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<span
	class="indicator tab tab-lifted rounded-lg"
	class:tab-active={layout == value}
	on:click={() => (layout = value)}>
	Layout | <slot />
	{#if chip}
		<span class="indicator-item badge">{chip}</span>
	{/if}
</span>

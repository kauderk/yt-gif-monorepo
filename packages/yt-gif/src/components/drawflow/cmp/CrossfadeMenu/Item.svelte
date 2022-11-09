<script lang="ts">
	export let hue = 0
	export let icon = 'info'
	export let expanded = false
	export let cmp: any = null
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="item" class:expanded style="--hue: {hue}" on:click>
	<i class="icon material-icons">{icon}</i>
	{#if expanded}
		{#if cmp}
			<svelte:component this={cmp} />
		{:else}
			<slot />
		{/if}
	{/if}
</div>

<style>
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 3rem;
		height: 3rem;
		border-width: 1px;
		border-style: solid;
		border-radius: 0.5rem;
		background-color: hsl(var(--hue), 100%, 80%);
		border-color: hsl(var(--hue), 100%, 30%);
		color: hsl(var(--hue), 100%, 30%);
		font-size: 14px;
		font-weight: bold;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		text-align: center;
	}

	.item.expanded {
		width: 100%;
		height: 100%;
		padding: 2rem;
	}

	.item.expanded .icon {
		font-size: 5rem;
	}

	.item:not(.expanded):hover {
		background-color: hsl(var(--hue), 100%, 40%);
		border-color: hsl(var(--hue), 100%, 40%);
		color: hsl(var(--hue), 100%, 95%);
	}
</style>

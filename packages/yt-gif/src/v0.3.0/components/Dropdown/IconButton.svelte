<script>
	import Icon from './Icon.svelte'

	export let path = ''
</script>

<div class="icon-button bp3-icon text-color-SA00" on:click|preventDefault>
	<Icon {path} size="1.2em" />
</div>

<style>
	.icon-button {
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: filter 300ms;
	}

	.icon-button:hover {
		filter: brightness(1.2);
	}
</style>

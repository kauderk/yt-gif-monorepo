<script>
	import { opened } from '../store'

	let open = true
</script>

<div class="wrapper">
	{#if open}
		<i class="fa-solid fa-sidebar" on:click={() => ($opened = null)} />
	{:else}
		<i class="fa-light fa-diagram-project" />
	{/if}
</div>

<style lang="scss">
	.wrapper {
		position: absolute;
		width: 2em;
		aspect-ratio: 1/1;
		display: block;
		background: #673ab7;
		border: 1px dotted dodgerblue;
		padding: 0.25em;
		border-radius: var(--radius-3);
		/* padding: var(--size-fluid-3); */
		box-shadow: var(--shadow-2);
		right: -1em;
		top: 90px;
		transform: translateX(-100%);

		&:hover {
			box-shadow: var(--shadow-3);
		}

		@media (--motionOK) {
			animation: var(--animation-fade-in);
		}
	}
</style>

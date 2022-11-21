<script lang="ts">
	// casuses problemns on @apps/dump
	// import MultiSelect from 'svelte-multiselect'

	const ui_libs = [`Svelte`, `React`, `Vue`, `Angular`, `...`]

	let selected: any[] = []
</script>

<div class="wrapper">
	<!-- <span>Tags: </span>
	<MultiSelect bind:selected options={ui_libs} /> -->
</div>

<style>
	.wrapper {
		width: min-content;
		display: flex;
		align-items: center;
		justify-content: center;
		align-content: flex-start;
		margin: auto;
		gap: 0.5em;
	}
	:root {
		--night: #10002c;
		--blue: cornflowerblue;
		--text-color: #ddd;

		--sms-active-color: var(--blue);
		--sms-options-bg: rgb(0, 0, 32);
		--sms-selected-bg: rgba(255, 255, 255, 0.2);
		--sms-text-color: white;
		--sms-disabled-bg: rgba(7, 1, 34, 0.87);
		--sms-li-disabled-bg: black;
		--sms-placeholder-color: lightgray;
		--sms-margin: 1em 0;

		--toc-mobile-bg: #1c0e3e;
		--toc-li-padding: 4pt 1ex;
		--toc-mobile-btn-color: white;
		--toc-desktop-nav-margin: 0 0 0 1em;

		--ghc-color: var(--night);
		--ghc-bg: white;
	}
</style>

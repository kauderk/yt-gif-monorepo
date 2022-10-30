<script>
	import Fill from './Fill.svelte'
	let mid = '0.5fr 2fr'
</script>

<!-- https://grid.layoutit.com/?id=iDBFlxu -->
<div class="app" style:grid-template-columns={mid}>
	<div class="main-graph">
		<slot name="main-footer"><Fill /></slot>
	</div>
	<div class="left-sidebar">
		<slot name="left-sidebar"><Fill /></slot>
	</div>
	<div class="right-sidebar">
		<slot name="right-sidebar"><Fill /></slot>
	</div>
	<div class="top-bar">
		<div class="icons" on:click={() => (mid = '0.5fr 2fr')}>
			<slot name="icons"><Fill /></slot>
		</div>
		<div class="search" on:click={() => (mid = '0.5fr 1.6fr 0.5fr')}>
			<slot name="search"><Fill /></slot>
		</div>
		<div class="status" on:click={() => (mid = '0fr 2fr 0.5fr')}>
			<slot name="status"><Fill /></slot>
		</div>
	</div>
	<div class="right-nav">
		<slot name="right-nav"><Fill /></slot>
	</div>
	<div class="left-nav" on:click={() => (mid = '0fr 1fr')}>
		<slot name="left-nav"><Fill /></slot>
	</div>
	<div class="right-content">
		<slot name="right-content"><Fill /></slot>
	</div>
	<div class="left-content">
		<slot name="left-content"><Fill /></slot>
	</div>
	<div class="left-footer">
		<slot name="left-footer"><Fill /></slot>
	</div>
	<div class="right-footer">
		<slot name="right-footer"><Fill /></slot>
	</div>
</div>

<style>
	.app {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
	}
	.app {
		display: grid;
		grid-template-columns: 0.5fr 1.6fr;
		grid-template-rows: 0.2fr 1.8fr 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
	}

	.main-graph {
		display: grid;
		grid-template-rows: 1.8fr 0.2fr;
		grid-auto-columns: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-area: 2 / 2 / 4 / 3;
	}

	.main-footer {
		grid-area: 2 / 1 / 3 / 2;
	}

	.left-sidebar {
		grid-area: 1 / 1 / 4 / 2;
	}

	.right-sidebar {
		grid-area: 1 / 3 / 4 / 4;
	}

	.top-bar {
		display: grid;
		grid-template-columns: 0.5fr 1fr 1.3fr;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-auto-flow: row;
		grid-template-areas: 'status search icons';
		grid-area: 1 / 2 / 2 / 3;
	}

	.icons {
		grid-area: icons;
	}

	.search {
		grid-area: search;
	}

	.status {
		grid-area: status;
	}

	.right-nav {
		grid-area: 1 / 3 / 2 / 4;
	}

	.left-nav {
		grid-area: 1 / 1 / 2 / 2;
	}

	.right-content {
		grid-area: 2 / 3 / 3 / 4;
	}

	.left-content {
		grid-area: 2 / 1 / 3 / 2;
	}

	.left-footer {
		grid-area: 3 / 1 / 4 / 2;
	}

	.right-footer {
		grid-area: 3 / 3 / 4 / 4;
	}
</style>

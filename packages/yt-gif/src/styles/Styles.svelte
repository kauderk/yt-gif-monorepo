<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" />
</svelte:head>

<style global>
	/* menu */
	.bp3-menu {
		background: var(--popover-bg);
		color: var(--popover-font-color);
		border-radius: 4px;
	}
	.bp3-popover {
		box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 2px 4px rgb(16 22 26 / 20%),
			0 8px 24px rgb(16 22 26 / 20%);
		transform: scale(1);
		border-radius: 3px;
		display: inline-block;
		z-index: 20;
	}
	.bp3-menu {
		background: #fff;
		border-radius: 3px;
		color: #182026;
		list-style: none;
		margin: 0;
		min-width: 180px;
		padding: 5px;
		text-align: left;
	}
	/* menu-item */
	.bp3-menu-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		border-radius: 2px;
		color: inherit;
		line-height: 20px;
		padding: 5px 7px;
		text-decoration: none;
		user-select: none;
	}
	.bp3-menu-item:hover {
		background-color: rgba(167, 182, 194, 0.3);
		cursor: pointer;
		text-decoration: none;
		color: inherit;
	}
	.bp3-menu-item:active {
		background-color: rgba(115, 134, 148, 0.3);
	}
	/* inner-menu-item */
	.bp3-button:not([class*='bp3-intent-']) {
		box-shadow: none;
		background-color: transparent;
		background-image: none;

		color: var(--icon-color);
	}
	.bp3-button.bp3-minimal {
		color: #777;
	}
	.bp3-menu-item {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		border-radius: 2px;
		color: inherit;
		line-height: 20px;
		padding: 5px 7px;
		text-decoration: none;
		user-select: none;
	}

	.bp3-menu-item::before,
	.bp3-menu-item > .bp3-icon {
		margin-top: 4px;
		margin-left: -3px;
	}
	.bp3-menu-item::before,
	.bp3-menu-item > .bp3-icon {
		color: #5c7080;
		margin-top: 2px;
	}
	.bp3-menu-item::before {
		font-family: 'Icons16', sans-serif;
		font-size: 16px;
		font-style: normal;
		line-height: 1;
		margin-right: 7px;
	}
	.bp3-menu-item::before,
	.bp3-menu-item > * {
		margin-right: 7px;
	}
	/* portals */
	.bp3-popover {
		box-shadow: 0 0 0 1px rgb(16 22 26 / 10%), 0 2px 4px rgb(16 22 26 / 20%),
			0 8px 24px rgb(16 22 26 / 20%);
		transform: scale(1);
		border-radius: 3px;
		display: inline-block;
		z-index: 20;
	}
	/* arrow */
	.bp3-popover .bp3-popover-arrow-fill {
		fill: var(--popover-bg);
	}
	.bp3-popover .bp3-popover-arrow {
		height: 30px;
		position: absolute;
		width: 30px;
	}
</style>

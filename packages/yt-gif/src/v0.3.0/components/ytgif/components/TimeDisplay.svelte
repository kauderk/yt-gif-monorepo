<div data-tooltip="Scroll Back and forward" data-tooltip-conf="bottom">
	<div class="timestamp iddle">
		<span class="start">00:00</span>
		<span>/</span>
		<span class="end">00:00</span>
	</div>
</div>

<style lang="scss">
	// reveal them on :hover
	// 00:00/00:00
	.timestamp {
		display: flex;
		align-items: center;
		justify-content: center;

		position: relative;
		margin: 0px 5px;

		right: 0;
		bottom: 0;

		overscroll-behavior: contain; // scroll back and forward yet ignore the document
		overflow: auto;

		height: calc(1.5em + 0.1em);
		font-size: 1.15em;

		cursor: row-resize;

		//color: transparent;
		color: black;
		transition: all 0.2s;

		&:hover {
			//color: white;
			text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
				1px 1px 0 #000;
		}
	}
	// offset feedback colors
	:is(.timestamp):hover :is([offset]) {
		color: red;
	}
	:is(.timestamp):hover :is([tick-offset]) {
		color: orange;
	}
</style>

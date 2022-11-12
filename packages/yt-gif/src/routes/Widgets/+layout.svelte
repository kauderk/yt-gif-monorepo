<div class="widget-layout">
	<slot />
</div>

<style lang="scss">
	div {
		width: 100vw;
		height: 100vh;
		overflow: hidden;

		// top center
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
	}
</style>

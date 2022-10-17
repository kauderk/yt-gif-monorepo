<div class="centered-window">
	<!-- target those who don't override or jump backwards on layouts -->
	<slot />
</div>

<style>
	.centered-window {
		background: rgba(128, 128, 128, 0.304);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: 'Montserrat', sans-serif;
		height: 100vh;
	}
</style>

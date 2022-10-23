<script>
	export let active = false
</script>

<div class="overlay-container">
	<div class="overlay">
		<div class="overlay-panel overlay-left">
			<h1>Welcome Back!</h1>
			<p>
				To keep connected with us please login with your personal info
			</p>
			<button class="ghost" id="signIn" on:click={() => (active = false)}
				>Sign In</button>
		</div>
		<div class="overlay-panel overlay-right">
			<h1>Hello, Friend!</h1>
			<p>Enter your personal details and start journey with us</p>
			<button class="ghost" id="signUp" on:click={() => (active = true)}
				>Sign Up</button>
		</div>
	</div>
</div>

<style lang="scss">
	@use '../../styles/auth/layout.css';
	.overlay-container {
		position: absolute;
		top: 0;
		left: 50%;
		width: 50%;
		height: 100%;
		overflow: hidden;
		transition: transform 0.6s ease-in-out;
		z-index: 100;
	}

	.overlay {
		background: #ff416c;
		background: -webkit-linear-gradient(to right, #ff4b2b, #ff416c);
		background: linear-gradient(to right, #ff4b2b, #ff416c);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 0 0;
		color: #ffffff;
		position: relative;
		left: -100%;
		height: 100%;
		width: 200%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.overlay-panel {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0 40px;
		text-align: center;
		top: 0;
		height: 100%;
		width: 50%;
		transform: translateX(0);
		transition: transform 0.6s ease-in-out;
	}

	.overlay-left {
		transform: translateX(-20%);
	}

	.overlay-right {
		right: 0;
		transform: translateX(0);
	}
</style>

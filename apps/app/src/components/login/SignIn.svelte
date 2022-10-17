<div class="form-container sign-in-container">
	<form action="#">
		<h1>Sign in</h1>
		<div class="social-container">
			<a href="/error" class="social"><i class="fab fa-facebook-f" /></a>
			<a href="/error" class="social"
				><i class="fab fa-google-plus-g" /></a>
			<a href="/error" class="social"><i class="fab fa-linkedin-in" /></a>
		</div>
		<span>or use your account</span>
		<input type="email" placeholder="Email" />
		<input type="password" placeholder="Password" />
		<a href="resetpass">Forgot your password?</a>
		<button>Sign In</button>
	</form>
</div>

<style lang="scss">
	@use '../../styles/auth/layout.css';
	.sign-in-container {
		left: 0;
		width: 50%;
		z-index: 2;
	}

	.social-container {
		margin: 20px 0;
	}

	.social-container a {
		border: 1px solid #dddddd;
		border-radius: 50%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		margin: 0 5px;
		height: 40px;
		width: 40px;
	}
</style>

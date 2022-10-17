<div class="form-container sign-up-container">
	<form action="#">
		<h1>Create Account</h1>
		<div class="social-container">
			<a href="/error" class="social"><i class="fab fa-facebook-f" /></a>
			<a href="/error" class="social"
				><i class="fab fa-google-plus-g" /></a>
			<a href="/error" class="social"><i class="fab fa-linkedin-in" /></a>
		</div>
		<span>or use your email for registration</span>
		<input type="email" placeholder="Email" />
		<input type="fullname" placeholder="Full name" />
		<input type="username" placeholder="Username" />
		<input type="password" placeholder="Password" />
		<button>Sign Up</button>
	</form>
</div>

<style lang="scss">
	@use '../../styles/auth/layout.css';

	.sign-up-container {
		right: 0;
		width: 50%;
		z-index: 1;
	}
</style>

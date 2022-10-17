<script>
	import Waves from '$cmp/landing/Waves.svelte'
</script>

<div class="header">
	<div class="container">
		<form action="" method="POST" class="form">
			<h1>Login</h1>
			<img
				alt="account icon"
				src="https://i.ibb.co/bvqgKnm/account.png"
				width="120"
				height="120" />
			<div class="input">
				<input
					type="email"
					name="email"
					class="form-input"
					id="email"
					placeholder="Email"
					required />
				<label for="email" id="email_label" class="label">Email</label>
			</div>
			<div class="input">
				<input
					type="password"
					class="form-input"
					placeholder="Password"
					id="password"
					required />
				<label for="password" class="label form-input">Password</label>
			</div>
			<p><a href="/">Forgot your password?</a></p>
			<button type="submit" id="submit_button">Login</button>
			<p>Or Sign Up Using:</p>
			<div class="social-share">
				<a href="/"><i class="fa-brands fa-google" /> </a>or
				<a href="/"><i class="fa-brands fa-facebook-f" /></a>
			</div>
		</form>
	</div>
</div>
<Waves color="red" />
<Waves color="green" />
<Waves color="blue" />

<style lang="scss">
	@use '../../../styles/auth/layout.css';
	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

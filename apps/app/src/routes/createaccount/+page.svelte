<script>
	import { onMount } from 'svelte'
	let container, signUpButton, signInButton

	onMount(() => {
		signUpButton.addEventListener('click', () => {
			container.classList.add('right-panel-active')
		})

		signInButton.addEventListener('click', () => {
			container.classList.remove('right-panel-active')
		})
	})
</script>

<h2>Sign in/up</h2>
<br />
<div class="container" id="container" bind:this={container}>
	<div class="form-container sign-up-container">
		<form action="#">
			<h1>Create Account</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f" /></a>
				<a href="#" class="social"
					><i class="fab fa-google-plus-g" /></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in" /></a>
			</div>
			<span>or use your email for registration</span>
			<input type="email" placeholder="Email" />
			<input type="fullname" placeholder="Full name" />
			<input type="username" placeholder="Username" />
			<input type="password" placeholder="Password" />
			<button>Sign Up</button>
		</form>
	</div>
	<div class="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div class="social-container">
				<a href="#" class="social"><i class="fab fa-facebook-f" /></a>
				<a href="#" class="social"
					><i class="fab fa-google-plus-g" /></a>
				<a href="#" class="social"><i class="fab fa-linkedin-in" /></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" />
			<input type="password" placeholder="Password" />
			<a href="resetpass">Forgot your password?</a>
			<button>Sign In</button>
		</form>
	</div>
	<div class="overlay-container">
		<div class="overlay">
			<div class="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>
					To keep connected with us please login with your personal
					info
				</p>
				<button class="ghost" id="signIn" bind:this={signInButton}
					>Sign In</button>
			</div>
			<div class="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start journey with us</p>
				<button class="ghost" id="signUp" bind:this={signUpButton}
					>Sign Up</button>
			</div>
		</div>
	</div>
</div>

<footer>
	<p>
		Created with <i class="fa fa-heart" /> by
		<a target="_blank" href="https://florin-pop.com">Lorem ipsum</a>
		- Lorem ipsum dolor sit amet consectetur, adipisicing elit.
	</p>
</footer>

<style>
	@import '../../styles/style1.css';
</style>

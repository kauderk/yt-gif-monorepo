<script>
	import Overlay from '$cmp/login/Overlay.svelte'
	import SignIn from '$cmp/login/SignIn.svelte'
	import SignUp from '$cmp/login/SignUp.svelte'

	let active = false
</script>

<h2>Sign in/up</h2>
<br />
<div class="container" id="container" class:right-panel-active={active}>
	<SignIn />
	<SignUp />
	<Overlay bind:active />
</div>

<style lang="scss">
	@use '../../../styles/auth/layout.css';
	.container {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
			0 10px 10px rgba(0, 0, 0, 0.22);
		position: relative;
		overflow: hidden;
		width: 768px;
		max-width: 100%;
		min-height: 480px;
	}

	.right-panel-active {
		// :global(.sign-in-container) {
		// 	// swap
		// 	right: 0;
		// 	transform: translateX(100%);
		// }
		// :global(.sign-up-container) {
		// 	// swap
		// 	left: 0;
		// 	z-index: 3;
		// 	transform: translateX(100%);
		// }

		:global(.overlay-container) {
			transform: translateX(-100%);
		}
		:global(.overlay) {
			transform: translateX(50%);
		}
		:global(.overlay-left) {
			transform: translateX(0);
		}
		:global(.overlay-right) {
			transform: translateX(20%);
		}
	}
</style>

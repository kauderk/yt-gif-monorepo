<script lang="ts">
	import Navbar from '$lib/PageComponents/Navbar.svelte'

	let dark: boolean = true
</script>

<div class:dark>
	<Navbar {dark} />
	<div id="page" class="mt-20 mb-40">
		<slot />
	</div>
</div>

<style>
	@import '../app.css';
</style>

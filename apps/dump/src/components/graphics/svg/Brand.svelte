<script>
	import Logo from './Logo.svelte'
	export let duration = 1500
	export let contrast = true
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a
	class:text-gray-800={contrast}
	class:text-white={!contrast}
	class="no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
	href="#">
	<!--Icon from: http://www.potlabicons.com/ -->
	<svg
		class="h-8 fill-current inline"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 512.005 512.005">
		<Logo {duration} {contrast} />
	</svg>
	yt-gif
	<span class="text-lg lg:text-2xl">v0.2.0</span>
</a>

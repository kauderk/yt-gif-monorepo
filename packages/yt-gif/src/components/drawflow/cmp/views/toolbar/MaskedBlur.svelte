<!-- 
	https://codepen.io/xboxyan/pen/ExvMpQB
	https://stackoverflow.com/questions/67874029/backdrop-filter-ignores-blur-value-on-stacked-elements-in-forefront
-->
<script lang="ts">
	export let cord = { x: 0, y: 0 }
	let div = <HTMLElement>{ offsetWidth: 0, offsetHeight: 0 }
</script>

<div
	bind:this={div}
	style:--x={cord.x / div.offsetWidth}
	style:--y={cord.y / div.offsetHeight} />

<style>
	div {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;

		mask: url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23C4C4C4'/%3E%3C/svg%3E"),
			linear-gradient(red, red);
		mask-size: 100px, 100%;
		mask-repeat: no-repeat;
		mask-position: calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), 0;
		mask-composite: xor;
		mask-composite: exclude;
		background: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
	}
</style>

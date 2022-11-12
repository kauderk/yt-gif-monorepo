<script lang="ts">
	import { crossfade, scale } from 'svelte/transition'
	let layout = 'layout-a'

	const [send, receive] = crossfade({
		duration: 200,
		// @ts-ignore
		fallback: scale,
	})
</script>

<div class="layout">
	<label
		><input type="radio" value="layout-a" bind:group={layout} />Layout A
		(display: flex)</label>
	<label
		><input type="radio" value="layout-b" bind:group={layout} />Layout B
		(float)</label>
	<label
		><input type="radio" value="layout-c" bind:group={layout} />Layout C
		(diplay: grid)</label>
</div>
<br />

{#if layout === 'layout-a'}
	<div class="container">
		<main class="layout-a">
			<div class="a" in:receive={{ key: 'a' }} out:send={{ key: 'a' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco
			</div>
			<div class="b" in:receive={{ key: 'b' }} out:send={{ key: 'b' }}>
				B
			</div>
			<div class="c" in:receive={{ key: 'c' }} out:send={{ key: 'c' }}>
				C
			</div>
		</main>
	</div>
{:else if layout === 'layout-b'}
	<div class="container">
		<main class="layout-b">
			<div class="b" in:receive={{ key: 'b' }} out:send={{ key: 'b' }}>
				B
			</div>
			<div class="a" in:receive={{ key: 'a' }} out:send={{ key: 'a' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris
				nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
				in reprehenderit in voluptate velit esse cillum dolore eu fugiat
				nulla pariatur. Excepteur sint occaecat cupidatat non proident,
				sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>
			<div class="c" in:receive={{ key: 'c' }} out:send={{ key: 'c' }}>
				C
			</div>
		</main>
	</div>
{:else if layout === 'layout-c'}
	<div class="container">
		<main class="layout-c">
			<div class="c" in:receive={{ key: 'c' }} out:send={{ key: 'c' }}>
				C
			</div>
			<div class="b" in:receive={{ key: 'b' }} out:send={{ key: 'b' }}>
				B
			</div>
			<div class="a" in:receive={{ key: 'a' }} out:send={{ key: 'a' }}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
				eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco
			</div>
			<div class="d" in:receive={{ key: 'd' }} out:send={{ key: 'd' }}>
				D
			</div>
		</main>
	</div>
{/if}

<style lang="scss">
	:global(body) {
		padding: 0;
	}
	.layout {
		padding: 8px;
	}
	.container {
		position: absolute;
		width: 100%;
		> main {
			padding: 0.5em;
			> div {
				height: auto;
			}
		}
	}
	.layout-a {
		display: flex;
	}

	.layout-a .a,
	.layout-a .b,
	.layout-a .c {
		flex: 1;
		font-size: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	.layout-a .a {
		color: white;
		font-size: 12px;
		display: block;
		padding: 4px;
	}
	.b {
		background: green;
	}
	.c {
		background: blue;
	}
	.d {
		background: red;
	}
	.layout-b .b {
		float: left;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin: 0.5em;
	}
	.layout-b .c {
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		margin: 0.5em;
	}

	.layout-c {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
	}
	.layout-c .b,
	.layout-c .c,
	.layout-c .d {
		color: white;
	}
</style>

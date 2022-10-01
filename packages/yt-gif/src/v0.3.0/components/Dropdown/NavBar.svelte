<script lang="ts">
	function inject(node: HTMLElement, argument = 'body') {
		var targetNode: any

		if (typeof argument !== 'string') {
			targetNode = argument
		} else {
			targetNode = document.querySelector(argument)
		}
		targetNode.insertAdjacentElement('afterbegin', node)

		return {
			destroy() {
				node.remove()
			},
		}
	}
</script>

<nav use:inject class="navbar" style={$$props.style}>
	<ul class="navbar-nav">
		<slot />
	</ul>
</nav>

<style>
	.navbar {
		height: var(--nav-size);
		background-color: var(--bg);
		padding: 0 1rem;
		border-bottom: var(--border);
		justify-content: flex-end;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.navbar-nav {
		max-width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
	}
</style>

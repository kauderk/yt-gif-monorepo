<script lang="ts">
	export const id = 'main'
	export let focus = false

	export let menu = {
		name: 'Experience',
		'data-tooltip': 'Quality of life Features',
	}
</script>

<div
	data-tooltip={menu['data-tooltip']}
	class="hover-bg container select-none"
	class:ddmFocus={focus}>
	<label class="mt-2" for={id}>{menu.name}</label>
</div>

<style lang="scss">
	label {
		background-color: hsla(
			var(--h-hover),
			var(--s-hover),
			calc(var(--l-hover) - 20%),
			var(--a-hover)
		);
		padding: 5px;
		border-radius: 5px;
	}
	.container {
		display: flex;
		align-items: center;

		border: 1px solid
			hsla(
				var(--h-outline),
				var(--s-outline),
				calc(var(--l-outline) + 20%),
				var(--a-outline)
			);
		border-radius: 10px;
	}
</style>

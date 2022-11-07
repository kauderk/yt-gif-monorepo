<script>
	import themeStore from 'svelte-themes'
</script>

<div>
	<select bind:value={$themeStore.theme} data-choose-theme>
		<option value="system">System</option>
		<option value="dark">Dark</option>
		<option value="light">Light</option>
	</select>
</div>

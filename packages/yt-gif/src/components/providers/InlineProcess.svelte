<script lang="ts">
	export let args = {}
	export let process: (detail: typeof args) => any
</script>

<slot res={process?.(args)} />

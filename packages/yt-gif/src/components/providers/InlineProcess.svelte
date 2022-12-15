<script lang="ts">
	export let args = {}
	export let before: (detail: typeof args) => any = args => {}
	before(args)
	export let process: (detail: typeof args) => any = args => {}
</script>

<slot res={process?.(args)} />

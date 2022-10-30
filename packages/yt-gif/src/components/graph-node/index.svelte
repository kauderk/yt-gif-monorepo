<script lang="ts">
	import Editor from '../milkdown/Editor.svelte'
	import {
		getDatabase,
		ref,
		set,
		onValue,
		update,
		remove,
	} from 'firebase/database'

	let doc = { type: 'doc', content: [{ type: 'paragraph' }] }

	let path = 1
	const DBPath = () => {
		const db = getDatabase()
		return ref(db, 'milkdown/' + path)
	}
	function setPath() {
		set(DBPath(), JSON.stringify(doc, null, 2))
	}
	function readPathSnap() {
		onValue(DBPath(), function (snap) {
			doc = JSON.parse(snap.val())
		})
	}
	function updatePath() {
		update(DBPath(), doc)
	}
	function removePath() {
		remove(DBPath())
	}
	$: key = 1
	let controls = true
</script>

<svelte:window
	on:keydown={e => {
		if (e.altKey && e.key == 's') {
			controls = !controls
		}
	}} />

<ul class="flex" class:hidden={controls}>
	<span>
		<label for="path">Path:</label>
		<input type="number" name="path" id="path" bind:value={path} />
	</span>
	<button on:click={setPath}>setPath</button>
	<button on:click={readPathSnap}>readPathSnap</button>
	<!-- <button on:click={updatePath}>updatePath</button> -->
	<button on:click={removePath}>removePath</button>
	<button on:click={() => (key += 1)}>Re-render</button>
</ul>

{#key key}
	<!-- key:{key} -->
	<Editor bind:doc defaultDoc={doc} />
{/key}

<!-- {JSON.stringify(doc, null, 2)} -->
<style lang="scss">
	@import 'https://unpkg.com/open-props';
	@import 'https://unpkg.com/open-props/normalize.min.css';
	@import 'https://unpkg.com/open-props/buttons.min.css';
	input {
		color: var(--text1);
		background: var(--surface2);
	}
	ul {
		flex-wrap: wrap;
		gap: 1em;
		margin: 0.5em;
	}
	button {
		padding: 0.2em;
		--_border: var(--surface2);
		--_text: var(--text1);
	}
	span {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5em;
	}
	input {
		width: 2em;
	}
</style>

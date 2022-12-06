<script>
	import { moduleStore } from './store'
	import { onMount, onDestroy } from 'svelte'
	import { browser } from '$app/environment'
	import { Editor } from '@tiptap/core'
	import StarterKit from '@tiptap/starter-kit'
	import Placeholder from '@tiptap/extension-placeholder'
	import TaskList from '@tiptap/extension-task-list'
	import TaskItem from '@tiptap/extension-task-item'
	import Link from '@tiptap/extension-link'
	import suggestion from './suggestion'
	import Commands from './command'
	import CommandList from './CommandList.svelte'
	import {
		slashVisible,
		slashItems,
		slashProps,
		editorWidth,
	} from '../stores'

	export let content
	let output = false
	let outputType

	let selectedIndex = 0
	$: selectedIndex = $slashVisible ? selectedIndex : 0
	$: $editorWidth = w ? w : '0'

	function handleKeydown(event) {
		if (!$slashVisible) return
		if (event.key === 'ArrowUp') {
			event.preventDefault()

			upHandler()
			return true
		}
		if (event.key === 'ArrowDown') {
			event.preventDefault()

			downHandler()
			return true
		}

		if (event.key === 'Enter') {
			event.preventDefault()
			enterHandler()
			return true
		}

		return false
	}

	function upHandler() {
		selectedIndex =
			(selectedIndex + $slashItems.length - 1) % $slashItems.length
	}

	function downHandler() {
		selectedIndex = (selectedIndex + 1) % $slashItems.length
	}

	function enterHandler() {
		selectItem(selectedIndex)
	}
	function selectItem(index) {
		const item = $slashItems[index]

		if (item) {
			//editor.chain().focus().toggleBold().run();
			//return console.log(item);
			let range = $slashProps.range
			item.command({ editor, range })
		}
	}

	let element, editor, w

	onMount(() => {
		if (browser) {
			editor = new Editor({
				element: element,
				editorProps: {
					attributes: {
						class: 'focus:outline-none flex flex-col items-center px-3 md:px-0',
					},
				},
				extensions: [
					StarterKit,
					Placeholder,
					TaskList,
					TaskItem,
					Link,
					Commands.configure({
						suggestion,
					}),
				],
				content,
				onTransaction: () => {
					// force re-render so `editor.isActive` works as expected
					editor = editor
				},
				onUpdate: ({ editor }) => {
					// send the content to an API here
				},
			})
		}
	})

	onDestroy(() => {
		if (editor) {
			editor.destroy()
		}
	})
</script>

<div class="prose prose-slate sm:prose-xl lg:prose-3xl" bind:clientWidth={w}>
	<div bind:this={element} on:keydown|capture={handleKeydown} />
</div>

<CommandList {selectedIndex} />

<svelte:window
	on:keydown={e => {
		if (e.key == 'y' && e.altKey) {
			$moduleStore.showExtraUI = !$moduleStore.showExtraUI
		}
	}} />

{#if $moduleStore.showExtraUI}
	<div class="sm:flex my-4">
		<button
			on:click={() => {
				output = editor.getJSON()
				outputType = 'json'
			}}
			class="m-2 border rounded-full px-4 py-2 border-slate-500 {outputType ==
			'json'
				? 'bg-blue-200'
				: ''}">See JSON Output</button>
		<button
			on:click={() => {
				output = editor.getHTML()
				outputType = 'html'
			}}
			class=" m-2 border rounded-full px-4 py-2 border-slate-500 {outputType ==
			'html'
				? 'bg-blue-200'
				: ''}">See HTML Output</button>
	</div>
{/if}

{#if output}
	<div class="sm:flex flex-row-reverse">
		<button
			class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
			on:click={() => (output = false)}>
			Clear output
		</button>
		<button
			class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
			on:click={() =>
				navigator.clipboard.writeText(JSON.stringify(output))}>
			Copy output
		</button>
	</div>
	{JSON.stringify(output)}
{/if}

<style>
	:global(h1, h2, h3, h4, h5, h6, p, ul, ol) {
		width: 100%;
	}
	:global(.ProseMirror h1, .ProseMirror h2, .ProseMirror h3) {
		margin-bottom: 0.5rem;
	}

	:global(.ProseMirror p.is-empty::before) {
		content: "Type '/' for commands";
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h1.is-empty::before) {
		content: 'Heading 1';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h2.is-empty::before) {
		content: 'Heading 2';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h3.is-empty::before) {
		content: 'Heading 3';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h4.is-empty::before) {
		content: 'Heading 4';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h5.is-empty::before) {
		content: 'Heading 5';
		color: #adb5bd;
		float: left;
		height: 0;
	}
	:global(.ProseMirror h6.is-empty::before) {
		content: 'Heading 6';
		color: #adb5bd;
		float: left;
		height: 0;
	}

	:global ul[data-type='taskList'] {
		list-style: none;
		padding-left: 2px;
	}
	:global ul[data-type='taskList'] li {
		display: flex;
		align-items: top;
	}
	:global ul[data-type='taskList'] li p {
		margin: 0;
	}
	:global ul[data-type='taskList'] li label {
		padding-right: 18px;
	}
	:global ul[data-type='taskList'] li label input {
		border-radius: 0.25rem;
		border-color: #cbd5e1;
	}
</style>
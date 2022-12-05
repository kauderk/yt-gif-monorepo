<script lang="ts">
	import Editor from 'cl-editor'

	export let id: s

	const createEditor = (target: HTMLElement) => {
		// Initialize editor
		const editor = new Editor({
			// <HTMLElement> required
			target,
			// optional
			props: {
				// <Array[string | Object]> string if overwriting, object if customizing/creating
				// available actions:
				// 'viewHtml', 'undo', 'redo', 'b', 'i', 'u', 'strike', 'sup', 'sub', 'h1', 'h2', 'p', 'blockquote',
				// 'ol', 'ul', 'hr', 'left', 'right', 'center', 'justify', 'a', 'image', 'forecolor', 'backcolor', 'removeFormat'
				actions: [
					'b',
					'i',
					'u',
					'strike',
					'ul',
					'ol',
					{
						name: 'copy', // required
						icon: '<b>C</b>', // string or html string (ex. <svg>...</svg>)
						title: 'Copy',
						result: () => {
							// copy current selection or whole editor content
							const selection = window.getSelection()
							if (selection && !selection.toString().length) {
								const range = document.createRange()
								range.selectNodeContents(editor.refs.editor)
								selection.removeAllRanges()
								selection.addRange(range)
							}
							editor.exec('copy')
						},
					},
					'h1',
					'h2',
					'p',
				],
				// default 300px
				height: '150px',
				// initial html
				html: '',
				// remove format action clears formatting, but also removes some html tags.
				// you can specify which tags you want to be removed.
				// removeFormatTags: ['h1', 'h2', 'blackquote'], // default
			},
		})
	}
</script>

<div class="all-initial">
	<div {id} use:createEditor />
</div>

<style>
	.all-initial > div {
		padding: 2em;
	}
</style>

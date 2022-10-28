<script context="module">
	// core
	import {
		Editor,
		rootCtx,
		defaultValueCtx,
		editorViewCtx,
	} from '@milkdown/core'
	//import { nord } from '@milkdown/theme-nord'

	// plugin
	// import { emoji } from '@milkdown/plugin-emoji'
	// import { menu } from '@milkdown/plugin-menu'
	import { slash } from '@milkdown/plugin-slash'
	import { history } from '@milkdown/plugin-history'
	// import { prism } from '@milkdown/plugin-prism'
	import { tooltip } from '@milkdown/plugin-tooltip'
	import { indent } from '@milkdown/plugin-indent'
	// import { trailing } from '@milkdown/plugin-trailing'
	// import { upload } from '@milkdown/plugin-upload'
	// import { cursor } from '@milkdown/plugin-cursor'
	// import { clipboard } from '@milkdown/plugin-clipboard'
	import { listener, listenerCtx } from '@milkdown/plugin-listener'

	import { commonmark } from '@milkdown/preset-gfm'
	// import { block, blockPlugin } from '@milkdown/plugin-block'
	// import { defaultConfigBuilder } from '@milkdown/plugin-block/src/config'
	import { iframe } from './yt-gif-plugin'
</script>

<script lang="ts">
	export let defaultDoc: object
	export let doc = <object>{}

	function editor(dom: Element) {
		const editor = Editor.make()
			.config(ctx => {
				ctx.set(rootCtx, dom)
				ctx.set(defaultValueCtx, {
					type: 'json',
					// @ts-ignore
					value: defaultDoc,
				})
				ctx.get(listenerCtx).updated((ctx, _doc, prevDoc) => {
					doc = _doc.toJSON()
				})
			})
			//.use(nord)
			.use(iframe)
			//.use(emoji)
			.use(slash)
			.use(commonmark)
			//.use(menu)
			.use(history)
			//.use(prism)
			.use(tooltip)
			.use(indent)
			//.use(trailing)
			//.use(upload)
			//.use(cursor)
			//.use(clipboard)
			.use(listener)
			// // @ts-ignore
			//.use(block.configure(blockPlugin, defaultConfigBuilder))
			.create()
		return {
			destroy() {
				editor.then(e =>
					e.action(ctx => ctx.get(editorViewCtx))?.destroy()
				)
			},
		}
	}
</script>

<div use:editor />

<style>
	@import '@material-design-icons/font/outlined.css';
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
	div,
	div :global(.milkdown) {
		height: inherit;
	}
	div :global(.milkdown) {
		overflow: auto;
	}
</style>

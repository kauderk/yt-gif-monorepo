<script lang="ts">
	import { getYouTubeVideoID } from '$lib/utils'
	import type { CreateYTGIF } from '$v3/api-ready/setup/query'
	export let wrapper: HTMLDivElement
	export let attr: CreateYTGIF = {
		targetClass: 'rm-xparser-default-yt-gif',
		dataCreation: 'null',
		url: 'https://youtu.be/qTgPSKKjfVg',
		accUrlIndex: 0,
		newId: 'string',
		customSpan: undefined,
	}
	$: id = getYouTubeVideoID(attr.url)
</script>

<span class="yt-gif-wrapper-parent snipcss-4qNoP">
	<div
		class="yt-gif-wrapper dont-focus-block yt-gif-awaiting-palyer--pulse-animation yt-gif-awaiting-for-user-input yt-gif-awaiting-for-user-input-with-thumbnail"
		data-target={attr.targetClass}
		data-creation={attr.dataCreation}
		data-video-url={attr.url}
		data-video-index={attr.accUrlIndex}
		bind:this={wrapper}
		style="background-image: url(&quot;https://img.youtube.com/vi/{id}/hqdefault.jpg&quot;);">
		<div class="yt-gif-iframe-wrapper">
			<div id="player_1" class="yt-gif-player" />
		</div>
		<div class="yt-gif-controls">
			<span class="yt-gif-invisible-element yt-gif-btn" data-tooltip="">
				<span
					type="checkbox"
					class="bp3-button bp3-minimal bp3-small m-0 appearance-none bp3-icon-changes"
					formatter="">
					<div class="yt-gif-url-btns-wrapper">
						<span
							class="yt-gif-url-btns vertical yt-gif-max-tooltip">
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="yt-gif]]}}"
								style="display: none;">
								<span
									class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-video"
									yt-gif-url-btn="yt-gif" />
							</span>
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="Restore YT URL">
								<span
									class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-link"
									yt-gif-url-btn="url" />
							</span>
							<span
								class="yt-gif-url-btn-wrapper btn-row yt-gif-max-tooltip">
								<span
									data-tooltip="start|end]]}}"
									class="yt-gif-url-btn-wrapper yt-gif-max-tooltip">
									<span
										yt-gif-url-btn="start|end"
										class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-time" />
								</span>
								<span
									class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
									data-tooltip="start]]}}">
									<span
										class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-stopwatch"
										yt-gif-url-btn="start" />
								</span>
								<span
									class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
									data-tooltip="end]]}}">
									<span
										class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-stopwatch"
										yt-gif-url-btn="end" />
								</span>
							</span>
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="swap format"
								style="display: none;">
								<span
									class="dont-focus-block bp3-button bp3-minimal bp3-small bp3-icon-segmented-control"
									yt-gif-url-btn="format" />
							</span>
						</span>
					</div>
				</span>
			</span>
			<div class="yt-gif-timestamp yt-gif-invisible-element">
				<div class="yt-gif-timestamp-start">00:00</div>
				<div>/</div>
				<div class="yt-gif-timestamp-end">00:00</div>
			</div>
			<span class="yt-gif-invisible-element yt-gif-btn" data-tooltip="">
				<span
					type="checkbox"
					class="bp3-button bp3-minimal bp3-small m-0 appearance-none bp3-icon-insert"
					insertoptions="">
					<div class="yt-gif-url-btns-wrapper">
						<span
							class="yt-gif-url-btns vertical yt-gif-max-tooltip">
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="Insert as &quot;start&quot; url">
								<span
									class="bp3-button bp3-minimal bp3-small dont-focus-block bp3-icon-left-join"
									yt-gif-url-btn="start" />
							</span>
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="Insert as &quot;end&quot; url">
								<span
									class="bp3-button bp3-minimal bp3-small dont-focus-block bp3-icon-right-join"
									yt-gif-url-btn="end" />
							</span>
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="Insert as &quot;speed&quot; url">
								<span
									class="bp3-button bp3-minimal bp3-small dont-focus-block bp3-icon-fast-forward"
									yt-gif-url-btn="speed" />
							</span>
							<span
								class="yt-gif-url-btn-wrapper yt-gif-max-tooltip"
								data-tooltip="Reset Boundaries">
								<span
									class="bp3-button bp3-minimal bp3-small dont-focus-block bp3-icon-reset"
									yt-gif-url-btn="reset" />
							</span>
						</span>
					</div>
				</span>
			</span>
		</div>
	</div>
</span>

<style>
	.roam-block {
		min-height: calc(1.5em + 8px);
		box-sizing: border-box;
		white-space: pre-wrap;
		overflow-wrap: break-word;
		margin-top: -1px;
		min-width: 100px;
		width: 100%;
		line-height: 1.5em;
		cursor: text;
		padding-top: 4px;
		padding-bottom: 4px;
	}

	@media (min-width: 700px) {
		.rm-block-text {
			max-width: unset !important;
		}
	}

	.hoverparent {
		max-width: 100%;
	}

	.rm-block__self {
		position: relative;
	}

	.roam-block-container .rm-block-main {
		display: flex;
		flex: 0 0 auto;
		align-items: flex-start;
		justify-content: flex-start;
	}

	.roam-block-container {
		display: flex;
		flex: 0 0 auto;
		flex-direction: column;
		border-radius: 2px;
	}

	.block-bullet-view {
		flex: 1 1 100%;
	}

	@media (min-width: 700px) {
		.roam-block-container {
			max-width: unset !important;
		}
	}

	.rm-block-children {
		display: flex;
		flex: 0 0 auto;
		flex-direction: column;
		position: relative;
	}

	.rm-block__children.rm-level-0 {
		margin-left: -27px;
	}

	.roam-log-page {
		border-bottom: 1.5px solid var(--references) !important;
		border-top: 0 !important;
		padding: 0 0 30px 0 !important;
		margin: 0 !important;
	}

	.rm-article-wrapper .roam-log-container .roam-log-page {
		border-top: 1px solid #738694;
		margin-top: 40px;
		padding-top: 40px;
		padding-bottom: 16px;
		margin-bottom: 16px;
	}

	.roam-log-page:first-child {
		border: 0px solid blue;
		margin-top: 0px;
		min-height: 500px;
		padding-top: 0px;
	}

	.flex-v-box {
		display: flex;
		flex: 0 0 auto;
		flex-direction: column;
	}

	.roam-article {
		padding: 10px 10px 120px 30px !important;
	}

	.roam-body .roam-app .roam-main .roam-article {
		position: relative;
		padding: 16px 42px 120px;
		padding-bottom: 100vh !important;
	}

	.rm-article-wrapper {
		transition: padding ease-in-out 300ms;
		height: 100%;
		padding-left: 12px;
		overflow-y: scroll;
	}

	.rm-article-wrapper.rm-spacing--small {
		padding-left: calc((100% - 800px) / 2);
		padding-right: calc((100% - 800px) / 2);
		transform: all ease-in 300ms;
	}

	.roam-body-main {
		margin-top: 45px;
		border-radius: 12px;
		background: var(--background);
		margin-right: 6px;
		margin-left: 9px;
	}

	.roam-body .roam-app .roam-body-main {
		flex: 0 0 calc(100% - 45px);
	}

	.roam-main {
		height: 99%;
	}

	.roam-body .roam-app .roam-main {
		display: flex;
		flex-direction: column;
	}

	.flex-h-box {
		display: flex;
		flex: 0 0 auto;
	}

	.roam-app {
		background: var(--sidebar-background);
	}

	.roam-body .roam-app {
		height: 100%;
		width: 100%;
		position: relative;
		-webkit-overflow-scrolling: touch;
		color: var(--body-text);
		caret-color: var(--cursor);
	}

	.roam-body {
		height: 100vh;
		overflow: hidden;
		position: relative;
		background: var(--sidebar-background);
	}

	#app {
		z-index: 0;
		isolation: isolate;
	}

	body {
		margin: 0;
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0.002em;
		line-height: 1.42857143;
		text-transform: none;
		color: rgba(68, 68, 68, 1);
		font-family: var(--global-font);
		background-color: #fff;
		height: 100%;
		padding: 0;
		overscroll-behavior: none;
		background: var(--sidebar-background);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	html {
		line-height: 1.15;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		font-family: 'Inter var', sans-serif;
		font-size: 14px;
		-webkit-tap-highlight-color: transparent;
		font-weight: 400;
		color: rgba(68, 68, 68, 1);
		letter-spacing: 0.002em;
		height: 100%;
		margin: 0;
		padding: 0;
		scroll-behavior: smooth;
		min-height: 100%;
	}

	:root {
		--yt-gif-player-span: 50%;
		--ddm-tooltip-arrow-size: 2ch;
		--ddm-scale-tooltip: 0;
		--ddm-tooltip-traslate-y: 0;
		--dropdown-main-btn-bg-h: rgba(167, 182, 194, 0.3);
		--dropdown--bg: #10161a;
		--awaiting-player-bg: rgba(47, 47, 53, 0.561);
		--ddm-tooltip-c: #989898;
		--ddm-tooltip-bg: #333;
		--url-btn-bg: #282828;
		--url-btn-bg-h: #213c4d;
	}

	@media (prefers-color-scheme: dark) {
		:root {
			--global-font: 'Work Sans', sans-serif;
			--secondary-font: 'Noto Sans Mono', monospace;
			--body-text: #f2f2f2;
			--italics-color: #92ffff;
			--background: #1b1a23;
			--sidebar-background: #2b2640;
			--closed-bullets: #5742c6;
			--references: #7c6ead;
			--cursor: #f2f2f2;
			--icons: #7c6ead;
			--icons-hover: #92ffff;
		}
	}

	:root {
		--global-font: 'Overlock', normal;
		--secondary-font: 'Fira Code', monospace;
		--body-text: #c3c3c3;
		--italics-color: #ff7ea2;
		--background: #141d28;
		--sidebar-background: #233346;
		--closed-bullets: #3e445d;
		--references: #9e8ddb;
		--cursor: #f2f2f2;
		--icons: #fbcc77;
		--icons-hover: #81ffea;
	}

	.yt-gif-wrapper-parent {
		cursor: initial;
	}

	*,
	:before,
	:after {
		-webkit-box-sizing: inherit;
		box-sizing: inherit;
	}

	:after,
	:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	:selection {
		background: rgba(125, 188, 255, 0.6);
	}

	.block-highlight-blue,
	:selection {
		background-color: var(--closed-bullets) !important;
	}

	:selection {
		background-color: #ee1d0d !important;
	}

	:-webkit-scrollbar {
		width: 0px;
		border-radius: 5px;
		background-color: rgba(0, 0, 0, 0.05);
		max-height: 4px;
		background: transparent;
	}

	.yt-gif-wrapper {
		display: -webkit-inline-box;
		width: var(--yt-gif-player-span);
		height: 100%;
		aspect-ratio: 16 / 9;
		filter: brightness(0.75);
		position: relative;
	}

	.yt-gif-awaiting-for-user-input {
		background-color: var(--awaiting-player-bg);
		border-radius: 10px;
	}

	.yt-gif-awaiting-for-user-input-with-thumbnail {
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		background-repeat-x: no-repeat;
		background-repeat-y: no-repeat;
	}

	.yt-gif-awaiting-palyer--pulse-animation {
		cursor: pointer;
		animation: pulse_dropdown_awaiting_player 6s infinite;
	}

	.yt-gif-wrapper {
		min-width: 520px;
	}

	.yt-gif-wrapper.dont-focus-block {
		margin: 2px;
	}

	div:-webkit-scrollbar {
		width: 5px;
		height: 5px;
		border-radius: 8px;
	}

	div:-webkit-scrollbar-thumb {
		background-color: var(--closed-bullets) !important;
	}

	div:-webkit-scrollbar-track {
		background-color: transparent;
		border-radius: 20px;
	}

	div:-webkit-resizer {
		border-style: solid;
		border-color: transparent var(--references) var(--references)
			transparent;
		background-color: transparent;
	}

	.yt-gif-awaiting-palyer--pulse-animation:hover {
		animation: none;
	}

	.yt-gif-iframe-wrapper {
		display: -webkit-inline-box;
		width: var(--yt-gif-player-span);
		height: 100%;
		aspect-ratio: 16 / 9;
		min-width: 220px;
	}

	.yt-gif-controls {
		height: -moz-fit-content;
		height: fit-content;
		width: 100%;
		display: flex;
		gap: 10px;
		position: absolute;
		bottom: 20%;
		justify-content: center;
		align-items: center;
		cursor: initial;
	}

	.yt-gif-invisible-element {
		opacity: 0;
		color: transparent;
	}

	.yt-gif-btn {
		position: relative;
		display: flex !important;
		width: 24px;
		aspect-ratio: 1 / 1;
	}

	:is([class*='yt-gif']) :is([data-tooltip]):before,
	:is([class*='yt-gif']) :is([data-tooltip]):after {
		color: var(--ddm-tooltip-c);
		font-size: 0.9em;
		text-align: center;
		height: auto;
		width: -moz-max-content;
		width: max-content;
		min-width: -moz-min-content;
		min-width: min-content;
		max-width: 45ch !important;
		position: absolute;
		left: 50%;
		transform: translateX(-50%) translateY(var(--ddm-tooltip-traslate-y))
			scale(var(--ddm-scale-tooltip));
		transition: 100ms transform;
		transform-origin: bottom center;
		font-weight: bold;
		z-index: 10000;
	}

	:is([class*='yt-gif']) :is([data-tooltip]):before {
		content: attr(data-tooltip);
		background-color: var(--ddm-tooltip-bg);
		border-radius: 0.7em;
		padding: 0ch 1ch;
		--ddm-tooltip-traslate-y: calc(-100% - var(--ddm-tooltip-arrow-size));
	}

	.yt-gif-controls :is([data-tooltip]):before,
	.yt-gif-controls :is([data-tooltip]):after {
		max-width: -moz-fit-content;
		max-width: fit-content;
	}

	.yt-gif-invisible-element:hover {
		opacity: 1;
	}

	.yt-gif-awaiting-for-user-input:hover .yt-gif-invisible-element {
		opacity: 1;
		color: white;
	}

	:is([class*='yt-gif']) :is([data-tooltip]):hover:before,
	:is([class*='yt-gif']) :is([data-tooltip]):hover:after {
		--ddm-scale-tooltip: 1;
	}

	.yt-gif-timestamp {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		margin: 0px 5px;
		right: 0;
		bottom: 0;
		overscroll-behavior: contain;
		overflow: auto;
		--h: 1.5em;
		height: calc(var(--h) + 0.1em);
		font-size: 1.15em;
		cursor: row-resize;
	}

	.yt-gif-timestamp:hover {
		color: white;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}

	[type='checkbox'] {
		box-sizing: border-box;
		padding: 0;
	}

	.bp3-button {
		display: -webkit-inline-box;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		border: 0;
		border-radius: 3px;
		cursor: pointer;
		font-size: 14px;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		padding: 5px 10px;
		text-align: left;
		vertical-align: middle;
		min-height: 30px;
		min-width: 30px;
	}

	.appearance-none {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	.m-0 {
		margin: 0;
	}

	.bp3-button {
		background-color: transparent;
		text-transform: initial;
		border: 0;
	}

	.yt-gif-btn span {
		display: flex;
	}

	.bp3-button:not([class*='bp3-intent-']) {
		background-color: #f5f8fa;
		background-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(rgba(255, 255, 255, 0.8)),
			to(rgba(255, 255, 255, 0))
		);
		background-image: linear-gradient(
			to bottom,
			rgba(255, 255, 255, 0.8),
			rgba(255, 255, 255, 0)
		);
		-webkit-box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
			inset 0 -1px 0 rgba(16, 22, 26, 0.1);
		box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
			inset 0 -1px 0 rgba(16, 22, 26, 0.1);
		color: #182026;
	}

	.bp3-button.bp3-small {
		min-height: 24px;
		min-width: 24px;
		padding: 0 7px;
	}

	.bp3-button.bp3-minimal {
		background: 0;
		-webkit-box-shadow: none;
		box-shadow: none;
	}

	[class*='yt-gif'] .m-0 {
		margin: 0 !important;
	}

	.bp3-button:not([class*='bp3-intent-']) {
		color: var(--body-text);
		font-family: var(--secondary-font);
		background: var(--sidebar-background) !important;
		transition: color 0.3s ease;
		padding: 0px 10px 0px 10px;
		transform: scale(0.9);
		box-shadow: none;
	}

	.bp3-button.bp3-minimal.bp3-small {
		color: var(--icons) !important;
		background: transparent !important;
		opacity: 1;
	}

	.bp3-button:before,
	.bp3-button > * {
		margin-right: 7px;
	}

	.bp3-icon-changes:before {
		content: '';
	}

	.bp3-button[class*='bp3-icon-']:before {
		font-family: 'Icons16', sans-serif;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 1;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		color: #5c7080;
	}

	:is([class*='yt-gif']) .bp3-button:before,
	.ty-gif-icon svg {
		margin: 0 !important;
	}

	.bp3-button[class*='bp3-icon-']:before,
	.bp3-icon-filter,
	.bp3-button.bp3-minimal.bp3-small,
	.bp3-icon.bp3-icon-calendar.filter-icon,
	.bp3-icon.filter-icon.bp3-icon-eye-open,
	.bp3-button.bp3-icon-calendar,
	.bp3-icon.bp3-icon-sort {
		color: var(--icons) !important;
		background: transparent !important;
		opacity: 1;
	}

	.yt-gif-controls span.bp3-button:before {
		margin: 0;
	}

	.yt-gif-controls .yt-gif-btn > .bp3-button:before {
		color: white;
		text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
			1px 1px 0 #000;
	}

	.bp3-button:not([class*='bp3-intent-']):hover {
		background-clip: padding-box;
		background-color: #ebf1f5;
		-webkit-box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
			inset 0 -1px 0 rgba(16, 22, 26, 0.1);
		box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
			inset 0 -1px 0 rgba(16, 22, 26, 0.1);
	}

	.bp3-button.bp3-minimal:hover {
		background: rgba(167, 182, 194, 0.3);
		-webkit-box-shadow: none;
		box-shadow: none;
		color: #182026;
		text-decoration: none;
	}

	.bp3-button[class*='bp3-icon-']:hover,
	.bp3-button.bp3-minimal:hover {
		background: transparent !important;
		transition: background 0.1s ease, color 0.3s ease;
		color: var(--icons-hover) !important;
		opacity: 1;
	}

	.bp3-button:not([class*='bp3-intent-']),
	.bp3-button:not([class*='bp3-intent-']):hover {
		box-shadow: none;
	}

	.bp3-button[class*='bp3-icon-']:hover,
	.bp3-button[class*='bp3-icon-']:hover:before,
	.bp3-icon-filter:hover,
	.bp3-button.bp3-minimal:hover,
	.bp3-icon.bp3-icon-calendar.filter-icon:hover,
	.bp3-icon.filter-icon.bp3-icon-eye-open:hover,
	.bp3-icon.bp3-icon-sort:hover,
	.bp3-button.bp3-minimal.bp3-icon-pin.bp3-small.pinned,
	.bp3-button.bp3-minimal.bp3-icon-pin.bp3-small.pinned:before {
		background: transparent !important;
		transition: background 0.1s ease, color 0.3s ease;
		color: var(--icons-hover) !important;
		opacity: 1;
	}

	.bp3-icon-insert:before {
		content: '';
	}

	.bp3-button > * {
		-webkit-box-flex: 0;
		-ms-flex-positive: 0;
		flex-grow: 0;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		margin-right: 7px;
	}

	.bp3-button > :last-child {
		margin-right: 0;
	}

	.yt-gif-url-btns {
		position: absolute;
		left: 100%;
		bottom: 0;
		gap: 0.1ch;
		display: none !important;
	}

	.yt-gif-url-btns.vertical {
		flex-direction: column-reverse;
		bottom: 100%;
		left: 0px;
	}

	.yt-gif-max-tooltip:before {
		width: -moz-max-content !important;
		width: max-content !important;
		max-width: -moz-max-content !important;
		max-width: max-content !important;
	}

	:is(.bp3-button, .rm-video-timestamp):hover .yt-gif-url-btns {
		display: flex !important;
	}

	.yt-gif-url-btns.vertical .yt-gif-url-btn-wrapper:before {
		left: 100%;
		transform: translateX(0%) translateY(20%)
			scale(var(--ddm-scale-tooltip));
	}

	[yt-gif-url-btn] {
		--btn-comment: var(https://kauderk.github.io/code-snippets/yt-gif/roamresearch/dev/--url-btn-bg);
		background-color: var(--btn-comment) !important;
	}

	.bp3-button:empty {
		padding: 0 !important;
	}

	.bp3-button.bp3-small,
	.bp3-small .bp3-button {
		min-height: 24px;
		min-width: 24px;
		padding: 0 7px;
	}

	.bp3-button.dont-focus-block {
		background: var(--sidebar-background);
		color: var(--body-text) !important;
		font-family: var(--secondary-font);
		font-weight: Bold;
	}

	.bp3-icon-video:before {
		content: '';
	}

	.bp3-button:empty:before,
	.bp3-button > :last-child {
		margin-right: 0;
	}

	[yt-gif-url-btn]:hover {
		--btn-comment: var(https://kauderk.github.io/code-snippets/yt-gif/roamresearch/dev/--url-btn-bg-h);
	}

	.bp3-icon-link:before {
		content: '';
	}

	.btn-row.yt-gif-url-btn-wrapper .yt-gif-url-btn-wrapper {
		display: none;
	}

	.btn-row.yt-gif-url-btn-wrapper :first-child {
		display: flex;
	}

	.btn-row.yt-gif-url-btn-wrapper:hover .yt-gif-url-btn-wrapper {
		display: flex;
	}

	.bp3-icon-segmented-control:before {
		content: '';
	}

	.bp3-icon-left-join:before {
		content: '';
	}

	.bp3-icon-right-join:before {
		content: '';
	}

	.bp3-icon-fast-forward:before {
		content: '';
	}

	.bp3-icon-reset:before {
		content: '';
	}

	.bp3-icon-time:before {
		content: '⏲';
	}

	.bp3-icon-stopwatch:before {
		content: '';
	}

	@keyframes pulse_dropdown_awaiting_player {
		0% {
			box-shadow: inset 0 0 2px 1px
				var(--awaiting-player-pulse-anim-box-shadow-start);
			box-shadow: inset 0 0 2px 1px
				var(--awaiting-player-pulse-anim-box-shadow-start);
		}
		50% {
			box-shadow: inset 0 0 8px 4px
				var(--awaiting-player-pulse-anim-box-shadow-mid);
			box-shadow: inset 0 0 8px 4px
				var(--awaiting-player-pulse-anim-box-shadow-mid);
		}
		100% {
			box-shadow: inset 0 0 2px 1px
				var(--awaiting-player-pulse-anim-box-shadow-end);
			box-shadow: inset 0 0 2px 1px
				var(--awaiting-player-pulse-anim-box-shadow-end);
		}
	}
</style>

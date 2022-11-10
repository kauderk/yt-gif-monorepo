<div id="header">
	<div class="header-row  snipcss-fgc3D">
		<div class="header-options ">
			<div class="header-option view ">
				<div class="header-option-choices ">
					<button
						class="header-option-choice "
						data-selected="true"
						type="button">
						<i class="fa-regular fa-grid-2 " />
					</button>
					<button class="header-option-choice " type="button">
						<i class="fa-solid fa-list " />
					</button>
					<!-- svelte-ignore security-anchor-rel-noreferrer -->
					<a
						href="https://youtube.com/shorts/smicZwXD5GI"
						target="_blank"
						class="header-option-choice "
						title="Click me">
						<i class="fa-brands fa-youtube " />
					</a>
				</div>
				<h3 class="header-option-label ">View</h3>
			</div>
			<div class="header-option ">
				<select class="header-option-dropdown ">
					<option value="new" class=""> New </option>
					<option value="old" class=""> Old </option>
					<option value="price-up" class=""> $ ➡ $$$ </option>
					<option value="price-down" class=""> $$$ ➡ $ </option>
				</select>
				<h3 class="header-option-label ">Sort</h3>
			</div>
			<div class="header-option ">
				<button
					class="header-option-toggle header-button "
					type="button">
					<i class="fa-regular fa-sliders " />
					<span class=""> Options </span>
				</button>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	* {
		box-sizing: border-box;
		border-width: 0;
		border-style: solid;
		border-color: #e5e7eb;
	}
	#header {
		--theme-primary: hsl(var(--hue), 15%, 15%);
		background-color: var(--theme-primary);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-radius: 0.75em;
		padding: 0.5em;
		> .header-row {
			display: flex;
			align-items: center;
		}
		.header-options {
			> .header-option {
				display: flex;
				flex-direction: column;
				gap: 0.25rem;
				> .header-option-choices {
					width: 100%;
					background-color: rgba(255, 255, 255, 0.1);
					border-radius: 0.25rem;
					display: flex;
					overflow: hidden;
					> .header-option-choice {
						background-color: transparent;
						width: 2.25rem;
						height: 2.25rem;
						display: grid;
						place-content: center;
						color: white;
						font-size: 0.9rem;
						outline: none;
						border: none;
						cursor: pointer;
						&:first-child {
							border-bottom-left-radius: 0.25rem;
							border-top-left-radius: 0.25rem;
						}
						&:hover {
							background-color: rgba(255, 255, 255, 0.1);
						}
						&:last-child {
							border-bottom-right-radius: 0.25rem;
							border-top-right-radius: 0.25rem;
						}
					}
					> .header-option-choice[data-selected='true'] {
						background-color: white;
						color: var(--theme-primary);
					}
				}
				> .header-option-label {
					font-size: 0.75rem;
					font-weight: 500;
					color: rgba(255, 255, 255, 0.75);
					padding-left: 0.75rem;
					text-transform: uppercase;
					// hmmm
					text-align: left;
				}
				> .header-option-dropdown {
					height: 2.25rem;
					background-color: rgba(255, 255, 255, 0.1);
					border-radius: 0.25rem;
					color: white;
					font-size: 0.8rem;
					font-weight: 500;
					padding: 0rem 0.5rem;
					border: none;
					outline: none;
					text-transform: uppercase;
					cursor: pointer;
					> option {
						color: var(--font-color);
						font-weight: 500;
						text-transform: uppercase;
					}
				}
			}
			> .header-option.view {
				flex-grow: 1;
				> .header-option-choices {
					> .header-option-choice {
						flex-grow: 1;
					}
					> a.header-option-choice {
						text-decoration: none;
					}
				}
			}
		}
		.header-button {
			> i {
				color: white;
				font-size: 0.8rem;
				line-height: 1rem;
			}
			> span {
				color: white;
				font-size: 0.8rem;
				line-height: 1rem;
				font-weight: 500;
				text-transform: uppercase;
			}
		}
	}
	:root {
		--purple: rgb(69, 39, 160);
		--white: 255, 255, 255;
		--theme-color: var(--white);
		--font-color: rgb(20, 20, 20);
		--theme-background: rgb(10, 10, 10);
		--theme-primary: var(--purple);
	}

	.header-options {
		width: 100%;
		display: flex;
		gap: 0.5rem;
	}
	h3 {
		font-size: inherit;
		font-weight: inherit;
		margin: 0;
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}
	select {
		font-family: inherit;
		font-size: 100%;
		font-weight: inherit;
		line-height: inherit;
		color: inherit;
		margin: 0;
		padding: 0;
		text-transform: none;
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}
	button {
		font-family: inherit;
		font-size: 100%;
		font-weight: inherit;
		line-height: inherit;
		color: inherit;
		margin: 0;
		padding: 0;
		text-transform: none;
		cursor: pointer;
		-webkit-appearance: button;
		background-color: transparent;
		background-image: none;
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}
	[type='button'] {
		-webkit-appearance: button;
		background-color: transparent;
		background-image: none;
	}
	.header-button {
		height: 2.25rem;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0rem 0.75rem;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 0.25rem;
		border: none;
		outline: none;
		cursor: pointer;
		&:hover {
			background-color: rgba(255, 255, 255, 0.15);
		}
	}
	a {
		color: inherit;
		text-decoration: inherit;
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}
	span {
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}
</style>

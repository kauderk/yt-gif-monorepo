<script lang="ts">
	// @ts-ignore
	import {inject} from '@packages/utils'
	import { onMount } from 'svelte'
	import { Icon } from 'sveltestrap'

	let menu_bar: HTMLElement
	let setting_drop: HTMLElement
	let help_drop: HTMLElement
	let show = false

	const openLeft = () => {
		menu_bar.style.marginLeft = '-400px'
		setTimeout(() => {
			setting_drop.style.display = 'block'
		}, 100)
	}
	const openLeft2 = () => {
		menu_bar.style.marginLeft = '-400px'
		setTimeout(() => {
			help_drop.style.display = 'block'
		}, 100)
	}
	const openRight = () => {
		menu_bar.style.marginLeft = '0px'
		setting_drop.style.display = 'none'
	}
	const close = () => {
		help_drop.style.display = 'none'
		menu_bar.style.marginLeft = '0px'
	}
	onMount(() => (show = true))
</script>

<nav use:inject>
	<div class="drop-btn">
		<button
			class="fas fa-caret-down"
			class:show
			on:click={() => (show = !show)}>Drop down</button>
	</div>
	<div class="tooltip" class:show style:color="red" />
	<div class="wrapper" class:show>
		<ul class="menu-bar" bind:this={menu_bar}>
			<li on:click={openLeft}>
				<a href="#">
					<div class="icon">
						<span class="fas fa-cog" />
					</div>
					Open Left<i class="fas fa-angle-right" />
				</a>
			</li>
			<li on:click={openLeft2}>
				<a href="#">
					<Icon name="alarm-fill" />
					Open Left
				</a>
			</li>
			<li>
				<a href="#">
					<div class="icon">
						<span class="fas fa-user" />
					</div>
					Disabled
				</a>
			</li>
		</ul>
		<!-- Settings & privacy Menu-items -->
		<ul class="setting-drop" bind:this={setting_drop}>
			<li class="arrow back-setting-btn" on:click={openRight}>
				<span class="fas fa-arrow-left" />Go Back
			</li>
			<li>
				<a href="#">
					<div class="icon">
						<span class="fas fa-user" />
					</div>
					Disabled
				</a>
			</li>
		</ul>
		<!-- Help & support Menu-items -->
		<ul class="help-drop" bind:this={help_drop}>
			<li class="arrow back-help-btn" on:click={close}>
				<span class="fas fa-arrow-left" />Go Back
			</li>
			<li>
				<a href="#">
					<div class="icon">
						<span class="fas fa-question-circle" />
					</div>
					Disabled
				</a>
			</li>
		</ul>
	</div>
</nav>

<style lang="scss">
	@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		user-select: none;
		font-family: 'Poppins', sans-serif;
	}
	nav {
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
		.drop-btn {
			width: 400px;
			background: #242526;
			border-radius: 5px;
			line-height: 55px;
			font-size: 20px;
			font-weight: 500;
			color: #b0b3b8;
			padding: 0 20px;
			span {
				float: right;
				line-height: 50px;
				font-size: 28px;
				cursor: pointer;
			}
		}
		.tooltip {
			position: absolute;
			right: 20px;
			bottom: -20px;
			height: 15px;
			width: 15px;
			background: #242526;
			transform: rotate(45deg);
			display: none;
			&.show {
				display: block;
			}
		}
	}
	.wrapper {
		position: absolute;
		top: 65px;
		display: flex;
		width: 400px;
		overflow: hidden;
		border-radius: 5px;
		background: #242526;
		display: none;
		transition: all 0.3s ease;
		&.show {
			display: block;
			display: flex;
		}
		.arrow {
			padding-left: 10px;
			font-size: 20px;
			font-weight: 500;
			color: #b0b3b8;
			cursor: pointer;
			span {
				margin-right: 15px;
			}
		}
		ul {
			width: 400px;
			list-style: none;
			padding: 10px;
			transition: all 0.3s ease;

			li {
				line-height: 55px;
				&:hover a {
					background: #3a3b3c;
				}
				a {
					position: relative;
					color: #b0b3b8;
					font-size: 18px;
					font-weight: 500;
					padding: 0 10px;
					display: flex;
					border-radius: 8px;
					align-items: center;
					text-decoration: none;
					.icon {
						height: 40px;
						width: 40px;
						margin-right: 13px;
						background: #ffffff1a;
						display: flex;
						justify-content: center;
						text-align: center;
						border-radius: 50%;
						span {
							line-height: 40px;
							font-size: 20px;
							color: #b0b3b8;
						}
					}
					i {
						position: absolute;
						right: 10px;
						font-size: 25px;
						pointer-events: none;
					}
				}
			}
		}
	}
	.wrapper ul.setting-drop,
	.wrapper ul.help-drop {
		display: none;
	}
</style>

<script>
	import Content from './Content.svelte'
	/*
	https://codepen.io/oliviale/pen/WqwOzv
	https://codepen.io/lufutu/pen/gogPbG
	https://codepen.io/oliviale/details/NZLNpo
	*/
</script>

<input class="variation" id="bluepurple" type="radio" value="1" name="color" />
<label for="bluepurple" />
<input
	class="variation"
	id="sunset"
	type="radio"
	value="2"
	name="color"
	checked={true} />
<label for="sunset" />
<input class="variation" id="godiva" type="radio" value="3" name="color" />
<label for="godiva" />
<!-- <input class="variation" id="dark" type="radio" value="4" name="color" />
<label for="dark" />
<input class="variation" id="pinkaru" type="radio" value="5" name="color" />
<label for="pinkaru" /> -->
<main id="main">
	<Content clazz="profile-imgonly" />
	<Content clazz="profile-default" />
	<Content clazz="profile-smallimg" />
	<Content clazz="profile-table" />
	<Content clazz="profile-wide" />
	<Content clazz="profile-long" />
	<Content clazz="profile-bigimg" />
</main>

<style lang="scss">
	:root {
		--canvasColor: #f9f9f9;
	}

	/*variations*/
	input.variation {
		display: none;
		+ label {
			display: inline-block;
			width: 50px;
			height: 50px;
			margin: 70px 20px 20px;
			border-radius: 50%;
			cursor: pointer;
			border: 6px solid #fff;
			box-shadow: 0 0 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
		}
	}

	#bluepurple {
		+ label {
			background: linear-gradient(to left, #673ab7 50%, #03a9f4 50%);
		}
		&:checked ~ main {
			--backgroundColor: #fff;
			--foregroundColor: #111;
			--primaryColor: #03a9f4;
			--primaryShade1: #e1f5fe;
			--primaryShade2: #b3e5fc;
			--primaryShade3: #4fc3f7;
			--primaryShade4: #0288d1;
			--primaryShade5: #0277bd;
			--secondaryColor: #673ab7;
			--secondaryShade1: #ede7f6;
			--secondaryShade2: #d1c4e9;
			--secondaryShade3: #9575cd;
			--secondaryShade4: #512da8;
			--secondaryShade5: #311b92;
			--accentColor: #009688;
			--accentShade1: #e0f2f1;
			--accentShade2: #b2dfdb;
			--accentShade3: #4db6ac;
			--accentShade4: #00796b;
			--accentShade5: #004d40;
			--accent2Color: #8bc34a;
			--accent2Shade1: #e7f6d5;
			--accent2Shade2: #c5e1a5;
			--accent2Shade3: #aed581;
			--accent2Shade4: #689f38;
			--accent2Shade5: #558b2f;
			--accent3Color: #f44336;
			--accent3Shade1: #ffdde0;
			--accent3Shade2: #ffcdd2;
			--accent3Shade3: #ef9a9a;
			--accent3Shade4: #d32f2f;
			--accent3Shade5: #b71c1c;
		}
	}

	#sunset {
		+ label {
			background: linear-gradient(to right, #ff9557 50%, #ffcc67 50%);
		}
		&:checked ~ main {
			--canvasColor: #f9f9f9;
			--backgroundColor: #fff;
			--foregroundColor: #111;
			--primaryColor: #ff9557;
			--primaryShade1: #ffe2d1;
			--primaryShade2: #ffceb2;
			--primaryShade3: #ffb184;
			--primaryShade4: #e88850;
			--primaryShade5: #d17a48;
			--secondaryColor: #ffcc67;
			--secondaryShade1: #fff1d5;
			--secondaryShade2: #ffde9e;
			--secondaryShade3: #ffd074;
			--secondaryShade4: #e8ba5e;
			--secondaryShade5: #ba954b;
			--accentColor: #4e5166;
			--accentShade1: #cecfd5;
			--accentShade2: #aeafb9;
			--accentShade3: #8e909d;
			--accentShade4: #6e7081;
			--accentShade5: #404354;
			--accent2Color: #588b8b;
			--accent2Shade1: #c2d4d4;
			--accent2Shade2: #a3bfbf;
			--accent2Shade3: #85aaaa;
			--accent2Shade4: #507f7f;
			--accent2Shade5: #497272;
			--accent3Color: #fe5f55;
			--accent3Shade1: #fec4c1;
			--accent3Shade2: #fea7a2;
			--accent3Shade3: #fe7c73;
			--accent3Shade4: #e7574e;
			--accent3Shade5: #b9463e;
		}
	}

	#godiva {
		+ label {
			background: linear-gradient(to right, #a05793 50%, #a3d858 50%);
		}
		&:checked ~ main {
			--canvasColor: #f9f9f9;
			--backgroundColor: #fff;
			--foregroundColor: #111;

			--primaryColor: #a05793;
			--primaryShade1: #e5d1e1;
			--primaryShade2: #d3b2cd;
			--primaryShade3: #b984b0;
			--primaryShade4: #925086;
			--primaryShade5: #834879;

			--secondaryColor: #a3d858;
			--secondaryShade1: #e5f4d1;
			--secondaryShade2: #cce9a3;
			--secondaryShade3: #bce285;
			--secondaryShade4: #95c550;
			--secondaryShade5: #779e41;

			--accentColor: #245e71;
			--accentShade1: #d7e1e5;
			--accentShade2: #afc4cb;
			--accentShade3: #7398a4;
			--accentShade4: #4b7b8a;
			--accentShade5: #1e4d5d;

			--accent2Color: #2aa5a1;
			--accent2Shade1: #d8eeed;
			--accent2Shade2: #9ed6d4;
			--accent2Shade3: #64bdba;
			--accent2Shade4: #279693;
			--accent2Shade5: #1f7976;

			--accent3Color: #92374d;
			--accent3Shade1: #ebdad3;
			--accent3Shade2: #cda4ae;
			--accent3Shade3: #af6d7d;
			--accent3Shade4: #853246;
			--accent3Shade5: #6b2939;
		}
	}

	main {
		// layout vars
		background: var(--canvasColor);
		font-family: 'Poppins', sans-serif;
		font-weight: 300;
		line-height: 1.5;
		font-size: 16px;
		text-align: center;
		transition: all 0.3s ease;

		// base theme
		--neutralShade1: #f2f2f2;
		--neutralShade2: #e8e9e9;
		--neutralShade3: #d1d3d4;
		--neutralShade4: #babdbf;
		--neutralShade5: #808488;
		--neutralShade6: #666a6d;
		--neutralShade7: #4d5052;
		--neutralShade8: #212122;

		--grayColor: #999;
		--lightGrayColor: #ddd;

		--borderRadius: 6px;
		--boxShadow: 0 2px 5px rgba(#333, 0.2);

		// position
		display: grid;
		grid-gap: 30px;
		grid-template-columns: repeat(6, auto);
		grid-template-rows: repeat(4, auto);
		width: 550px;
		justify-content: center;

		// overall layout
		margin: 3em auto 8em;
		color: var(--foregroundColor);

		text-align: left;
	}
</style>

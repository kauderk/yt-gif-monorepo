<script>
	import Content from './Content.svelte'
	/*
	https://codepen.io/oliviale/pen/WqwOzv
	https://codepen.io/lufutu/pen/gogPbG
	https://codepen.io/oliviale/details/NZLNpo
	*/
</script>

<main
	id="main"
	class="rounded-xl shadow-2xl dark:bg-gray-800 dark:shadow-slate-800 bg-gray-200 shadow-slate-200">
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
	:global(html) {
		--backgroundColor: #fff;
		--foregroundColor: #111;
	}

	// sunset
	:root {
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

	:global(.dark) {
		--backgroundColor: #111;
		--foregroundColor: #fff;

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

	main {
		// layout vars
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
		//width: 550px;
		justify-content: center;

		// overall layout
		margin: 3em auto 8em;
		color: var(--foregroundColor);

		text-align: left;
	}
</style>

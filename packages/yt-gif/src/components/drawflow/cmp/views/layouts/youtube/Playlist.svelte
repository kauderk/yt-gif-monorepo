<script>
	let openClose = true
	import data from './playlist.json'
	var arr = data.playlist
</script>

<div class="listContainer">
	<div class="listHeader">
		<div class="listHeaderL">
			<p class="listTitle">Youtube Playlist Clone</p>
			<p class="listOwner">
				<a
					href="https://www.instagram.com/gokhan.js"
					style="color: rgb(86, 186, 253); text-decoration: none"
					>@gokhan.js</a>
				on Instagram
			</p>
		</div>
		<div class="listHeaderR">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<i
				class="fas fa-angle-{openClose ? 'up' : 'down'}"
				id="collapse"
				on:click={() => (openClose = !openClose)} />
		</div>
	</div>
	<div
		class="listContent"
		id="playlist"
		style:display={openClose ? 'block' : 'none'}>
		<div class="listItem">
			<div class="itemImage">
				<img
					src="https://images4.alphacoders.com/936/936378.jpg"
					alt="" />
				<button class="itemLength">2:55</button>
			</div>
			<div class="itemInfo">
				<p class="videoTitle">Gokhan 'YokanJS' Yildiz</p>
				<p class="videoOwner">YokanJS</p>
			</div>
		</div>

		{#each arr as item}
			<div class="listItem">
				<div class="itemImage">
					<img src={item.image} alt="" />
					<button class="itemLength">{item.length}</button>
				</div>
				<div class="itemInfo">
					<p class="videoTitle">{item.title}</p>
					<p class="videoOwner">{item.owner}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	body {
		background-color: rgb(24, 24, 24);
		padding: 1rem;
		font-family: 'montserrat';
	}
	.listContainer {
		width: 100%;
		background-color: rgb(32, 32, 32);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}
	.listHeader {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px 1.5rem 10px 1rem;
	}
	.listHeaderR {
		color: #e5e5e5;
		font-size: 1.2em;
		cursor: pointer;
	}
	.listTitle,
	.videoTitle {
		color: #e5e5e5;
		font-size: 0.9em;
		font-weight: 600;
	}
	.listOwner,
	.videoOwner {
		padding: 4px 0;
		color: #aaaaaa;
		font-size: 0.8em;
	}
	/* List */
	.listContent {
		width: 100%;
		height: auto;
		max-height: 460px;
		padding-top: 4px;
		background-color: rgb(24, 24, 24);
		overflow-y: scroll;
	}
	.listContent::-webkit-scrollbar {
		width: 10px;
	}
	.listContent::-webkit-scrollbar-thumb {
		background-color: rgb(48, 48, 48);
	}
	.listItem {
		display: flex;
		padding: 4px 1.6rem;
		max-height: 150px;
	}
	.listItem:hover {
		background-color: rgb(48, 48, 48);
	}
	.itemImage {
		width: 100px;
		height: 56px;
		background-color: gainsboro;
		margin-right: 0.8rem;
		position: relative;
	}
	.itemImage img {
		width: 100%;
		height: 100%;
	}
	.itemLength {
		position: absolute;
		right: 5px;
		bottom: 1px;
		padding: 4px;
		background-color: rgba(0, 0, 0, 0.8);
		border: none;
		color: #e5e5e5;
	}
</style>

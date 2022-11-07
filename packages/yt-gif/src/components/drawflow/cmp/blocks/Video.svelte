<script lang="ts">
	let video: HTMLVideoElement
</script>

<!--
Data: https://gfycat.com/cajax/get/VerifiableTerrificHind
 
Source: https://www.youtube.com/watch?v=nZcejtAwxz4

More info on youtube api for thumbnails: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
-->
<div id="videosList">
	<div class="video">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			class="thevideo"
			loop
			preload="none"
			on:mouseenter={video?.play}
			on:mouseleave={video?.pause}
			bind:this={video}>
			<source
				src="https://giant.gfycat.com/VerifiableTerrificHind.mp4"
				type="video/mp4" />
			<source
				src="https://giant.gfycat.com/VerifiableTerrificHind.webm"
				type="video/webm" />
			Your browser does not support the video tag.
		</video>
	</div>
	Hover me to play the video.
</div>

<style lang="scss">
	// https://codepen.io/aperazzi/pen/eeQYMQ
	#videosList {
		max-width: 300px;
		overflow: hidden;
	}

	.video {
		background-image: url('https://img.youtube.com/vi/nZcejtAwxz4/maxresdefault.jpg');
		aspect-ratio: 16 / 9;
	}

	/* Hide Play button + controls on iOS */
	video::-webkit-media-controls {
		display: none !important;
	}
</style>

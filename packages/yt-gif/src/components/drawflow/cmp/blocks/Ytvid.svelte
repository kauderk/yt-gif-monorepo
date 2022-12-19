<script lang="ts">
	import { getYouTubeVideoID } from '$lib/utils'

	let newURL = ''

	function changeUrl(e: any) {
		e.preventDefault()
		let id = getYouTubeVideoID(e.target.querySelector('.url').value)
		newURL = 'https://www.youtube.com/embed/' + id
	}
</script>

<div class="card toggleable">
	<div class="text-holder">
		<form on:submit={changeUrl}>
			<div class="form-group">
				<input
					class="form-control url"
					size="40"
					placeholder="Pegue aqui el URL del video" />
			</div>
			<div class="form-group">
				<button class="btn btn-success" id="btnshow">Show Video</button>
			</div>
		</form>

		<br />
		<div class="textar">
			<textarea id="freeform" name="freeform" rows="4" cols="35" />
		</div>
	</div>

	{#key newURL}
		{#if newURL}
			<iframe
				title="video"
				class="embed-responsive-item"
				src={newURL}
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen />
		{/if}
	{/key}
</div>

<style lang="scss">
	.card {
		position: relative;
		width: max(35vw, 350px - 3vw);
		height: 30vmin;
		background: #02011f;
		border: 1px solid #433f0e;
		border-radius: 15px;
		overflow: hidden;
	}

	.text-holder {
		width: 60%;
		margin: 10px;
		margin-left: 20px;
		margin-top: 15px;
	}
	button {
		margin-top: 5px;
		height: 10px;
		border-radius: 5px;
		color: aliceblue;
		background: #170550;
		bottom: 10px;
	}

	textarea {
		resize: none;
		display: inline-block;
	}

	.embed-responsive-item {
		position: absolute;
		top: 60%;
		right: 1rem;
		transform: translateY(-50%);
		width: 50%;
		height: 60%;
		background-image: url(https://assets.codepen.io/4787486/pattern4.jpg);
		background-size: cover;
		border-radius: 0 5px 5px 0;
		box-shadow: 3px 3px 10px 0 rgba(0 0 0 / 0.7);
		transition: all 0.4s ease-in-out 0.075s;
	}
</style>

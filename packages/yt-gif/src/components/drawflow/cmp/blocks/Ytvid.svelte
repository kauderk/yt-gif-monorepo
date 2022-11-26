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

		<br /><br />
		<textarea id="freeform" name="freeform" rows="4" cols="30" />
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
	}

	button {
		margin-top: 5px;
		height: 10px;
		border-radius: 5px;
		background: #6611cf;
	}

	.freeform {
		position: absolute;
		padding-top: 15px;
	}

	.embed-responsive-item {
		position: absolute;
		top: 50%;
		right: 3rem;
		transform: translateY(-50%);
		width: 30%;
		height: 50%;
		background-image: url(https://assets.codepen.io/4787486/pattern4.jpg);
		background-size: cover;
		border-radius: 0 5px 5px 0;
		box-shadow: 3px 3px 10px 0 rgba(0 0 0 / 0.7);
		transition: all 0.4s ease-in-out 0.075s;
	}
</style>

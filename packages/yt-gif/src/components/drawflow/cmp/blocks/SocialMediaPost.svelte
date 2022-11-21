<div id="phone">
	<div id="content">
		<div class="feed">
			<div class="post">
				<div class="profile">
					<img
						alt="profile"
						src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />
					<div class="profile-info">
						<h3 class="name">Chester</h3>
						<h3 class="role">Account Manager · Oct 1</h3>
					</div>
				</div>
				<h3 class="title">
					Why are the sea turtles so angry these days?
				</h3>
				<h3 class="desc">
					This place is so blue I can hardly stand it any longer. I
					have only seen blue my entire life. - A sea turtle.
				</h3>
				<img
					alt="sea turtle"
					src="https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80" />
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	// https://codepen.io/Hyperplexed/pen/dyeKgNq
	:root {
		--font-color: 200, 200, 200;
		--highlight-color: 3, 169, 244;
		--body-color: 20, 30, 40;

		--theme-background: 38, 38, 38;
		--theme-primary: 185, 43, 39;
	}

	* {
		box-sizing: border-box;
	}

	h3 {
		color: rgb(var(--font-color));
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}

	#phone {
		background-color: rgb(var(--theme-background));
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
		height: auto;
		width: 393px;
		margin: 0.5em;
		position: relative;
		overflow: hidden;
	}
	#content {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		padding: 0rem 0.25rem;
	}

	#content > .feed {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	#content > .feed > .post {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		background-color: rgb(20 20 20);
		padding: 0.5rem;
		border-radius: 0.25rem;
		overflow: hidden;
	}

	#content > .feed > .post > .profile {
		display: flex;
		gap: 0.5rem;
	}

	#content > .feed > .post > .profile > img {
		height: 2rem;
		width: 2rem;
		border-radius: 2rem;
		object-fit: cover;
	}

	#content > .feed > .post > .profile > .profile-info > .name {
		font-size: 0.9rem;
		font-weight: 500;
	}

	#content > .feed > .post > .profile > .profile-info > .role {
		font-size: 0.7rem;
	}

	#content > .feed > .post > .title {
		font-weight: 500;
		color: rgb(var(--font-color));
	}

	#content > .feed > .post > .desc {
		font-size: 0.8rem;
		color: rgb(180 180 180);
	}

	#content > .feed > .post > img {
		width: 100%;
		height: 12rem;
		border-radius: 0.25rem;
		object-fit: cover;
	}

	@media (max-width: 500px) {
		#phone {
			height: 100vh;
			display: flex;
			width: 100%;
			margin: 0px auto;
		}
	}
</style>

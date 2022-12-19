<div class="row">
	<div class="col-lg-4 col-md-6">
		<div class="card animation-demo">
			<div class="card__header">
				<h2>
					Attention Seekers <small
						>Click on the buttons below to start the animation</small>
				</h2>
			</div>

			<div class="card__body">
				<img
					src="https://lh3.googleusercontent.com/O8PZ30vXgddUt86G7SVXCZalWHM627GzqZ4w3wwIY091l6-Edb7KFBkzbveYqh-cz9-ThPmBV5VByQ=w1026-h440-rw"
					alt=""
					class="animated" />

				<div class="row">
					<div class="col-6">
						<button class="btn btn--light">bounce</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">flash</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">pulse</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">rubberBand</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">shake</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">swing</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">tada</button>
					</div>
					<div class="col-6">
						<button class="btn btn--light">wobble</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	// https://codepen.io/lufutu/pen/gogPbG
	// https://codepen.io/oliviale/pen/aPwaXm
	@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300ita‌​lic,400italic,500,500italic,700,700italic,900italic,900);

	small {
		display: block;
	}
	.row {
		margin: 0.5em;
	}
	.card {
		position: relative;
		background: #2b3942;

		border-radius: 2px;
	}
	.card__header {
		position: relative;
		border-radius: 2px 2px 0 0;
	}
	.card__header h2 {
		margin: 0;
		line-height: 100%;
		font-size: 16px;
		font-weight: 400;
		color: #b4bfc3;
	}
	.card__body {
		padding: 0 15px 15px;
	}
	.card__body > img {
		position: relative;
		width: 100%;
		z-index: 1;
		border-radius: 2px;
	}
	.btn--light {
		background-color: #394650;
		border-color: #394650;
		color: #b4bfc3;
	}
	.btn {
		width: 100%;
		text-transform: none;
	}
	@media (min-width: 768px) {
		.card__body,
		.card__header {
			padding: 30px 32px;
		}
	}

	@media (max-width: 767px) {
		.card__body,
		.card__header {
			padding: 25px 27px;
		}
	}
	.col-6 {
		padding: 0 6px;
		margin-bottom: 12px;
	}
</style>

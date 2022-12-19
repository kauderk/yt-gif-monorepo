<div id="phone">
	<div id="main-wrapper" class="fancy-scrollbar">
		<div id="main">
			<div id="header">
				<div class="header-row">
					<div class="header-search-bar">
						<input
							class="header-search-bar-input"
							type="search"
							placeholder="Search" />
						<button class="header-search-bar-button" type="button">
							<i class="fa-solid fa-magnifying-glass" />
						</button>
					</div>
				</div>
				<div class="header-row">
					<div class="header-options">
						<div class="header-option view">
							<div class="header-option-choices">
								<button
									class="header-option-choice"
									data-selected="true"
									type="button">
									<i class="fa-regular fa-grid-2" />
								</button>
								<button
									class="header-option-choice"
									type="button">
									<i class="fa-solid fa-list" />
								</button>
								<a
									rel="noreferrer"
									href="https://youtube.com/shorts/smicZwXD5GI"
									target="_blank"
									class="header-option-choice"
									title="Click me">
									<i class="fa-brands fa-youtube" />
								</a>
							</div>
							<h3 class="header-option-label">View</h3>
						</div>
						<div class="header-option">
							<select class="header-option-dropdown">
								<option value="new">New</option>
								<option value="old">Old</option>
								<option value="price-up">$ ➡ $$$</option>
								<option value="price-down">$$$ ➡ $</option>
							</select>
							<h3 class="header-option-label">Sort</h3>
						</div>
						<div class="header-option">
							<button
								class="header-option-toggle header-button"
								type="button">
								<i class="fa-regular fa-sliders" />
								<span>Options</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div id="content">
				<div id="content-listings-header-wrapper">
					<div id="content-listings-header">
						<div class="content-listings-pagination">
							<button
								class="content-pagination-button double-back"
								type="button">
								<i class="fa-regular fa-chevrons-left" />
							</button>
							<button
								class="content-pagination-button back"
								type="button">
								<i class="fa-regular fa-chevron-left" />
							</button>
							<h3 class="content-pagination-label">
								<span class="accent-text">Page</span>1 / 12
							</h3>
							<button
								class="content-pagination-button forward"
								type="button">
								<i class="fa-regular fa-chevron-right" />
							</button>
							<button
								class="content-pagination-button save-search"
								type="button">
								Save Search
							</button>
						</div>
						<h3 class="content-listings-pagination-quantity-label">
							<span class="accent-text">Showing</span> 1 - 100
							<span class="accent-text">of</span> 1147
						</h3>
					</div>
				</div>
				<div id="content-listings">
					<div class="listing">
						<div class="listing-images">
							<img
								alt="don't know"
								class="listing-image"
								src="https://images.unsplash.com/photo-1662313708911-06070ec5b383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" />
						</div>
						<div class="listing-info-wrapper">
							<div class="listing-info">
								<h3 class="listing-info-title">
									Old timey bike that I found by this tree
								</h3>
								<h3 class="listing-info-details">
									<span class="listing-info-date"
										>Sept 2</span>
									<span>·</span>
									<span class="listing-info-location"
										>South Hills</span>
								</h3>
							</div>
						</div>

						<button class="listing-favorite-button" type="button">
							<i class="fa-regular fa-heart" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	#main {
		border-radius: 1em;
	}
	// https://codepen.io/Hyperplexed/pen/mdLyRZX
	:root {
		--font-color: rgb(20, 20, 20);
		--lighter-font-color: rgb(80, 80, 80);
		--highlight-color: rgb(33, 150, 243);
		--yellow: rgb(253, 216, 53);
		--purple: rgb(69, 39, 160);
		--body-color: rgb(30, 40, 50);

		--theme-background: rgb(10, 10, 10);
		--theme-primary: var(--purple);
	}

	* {
		box-sizing: border-box;
	}

	h3,
	input,
	select,
	button,
	span,
	a {
		color: var(--font-color);
		font-family: 'Rubik', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		margin: 0px;
	}

	.fancy-scrollbar::-webkit-scrollbar {
		width: 4px;
	}

	.fancy-scrollbar::-webkit-scrollbar-track {
		background-color: transparent;
	}

	.fancy-scrollbar::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.15);
	}

	#phone {
		background-color: var(--theme-background);
		box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 24px;
		height: auto;
		width: 393px;
		margin: 0.5em;
		position: relative;
	}

	#main-wrapper {
		height: 100%;
		overflow: auto;
	}

	#header {
		background-color: var(--theme-primary);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		border-top-left-radius: 0.75rem;
		border-top-right-radius: 0.75rem;
		padding: 1rem;
	}

	#header > .header-row {
		display: flex;
		align-items: center;
	}

	#header .header-button {
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
	}

	#header .header-button:hover,
	#header .header-button:focus {
		background-color: rgba(255, 255, 255, 0.15);
	}

	#header .header-button > i,
	#header .header-button > span {
		color: white;
		font-size: 0.8rem;
		line-height: 1rem;
	}

	#header .header-button > span {
		font-weight: 500;
		text-transform: uppercase;
	}

	#header .header-search-bar {
		color: white;
		border-radius: 0.25rem;
		flex-grow: 1;
		position: relative;
	}

	#header .header-search-bar > .header-search-bar-input {
		width: 100%;
		height: 3rem;
		background-color: rgba(255, 255, 255, 0.1);
		border: 1px solid transparent;
		border-radius: inherit;
		color: white;
		padding: 1rem;
		padding-right: 3rem;
		outline: none;
	}

	#header .header-search-bar > .header-search-bar-input:focus {
		border-color: rgba(255, 255, 255, 0.2);
	}

	#header .header-search-bar > .header-search-bar-input::placeholder {
		color: rgba(255 255 255 / 40%);
	}

	#header .header-search-bar > .header-search-bar-button {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 3rem;
		width: 3rem;
		border-radius: 0.25rem;
		background-color: transparent;
		border: none;
		outline: none;
		position: absolute;
		right: 0px;
		top: 0px;
		cursor: pointer;
	}

	#header .header-search-bar > .header-search-bar-button:hover,
	#header .header-search-bar > .header-search-bar-button:focus {
		background-color: rgba(255, 255, 255, 0.1);
	}

	#header .header-search-bar > .header-search-bar-button > i {
		color: white;
	}

	#header .header-options {
		width: 100%;
		display: flex;
		gap: 0.5rem;
	}

	#header .header-options > .header-option {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	#header .header-options > .header-option.view {
		flex-grow: 1;
	}

	#header
		.header-options
		> .header-option.view
		> .header-option-choices
		> .header-option-choice {
		flex-grow: 1;
	}

	#header
		.header-options
		> .header-option.view
		> .header-option-choices
		> a.header-option-choice {
		text-decoration: none;
	}

	#header .header-options > .header-option > .header-option-label {
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.75);
		padding-left: 0.75rem;
		text-transform: uppercase;
	}

	#header .header-options > .header-option > .header-option-dropdown {
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
	}

	#header .header-options > .header-option > .header-option-dropdown:hover,
	#header .header-options > .header-option > .header-option-dropdown:focus {
		background-color: rgba(255, 255, 255, 0.15);
	}

	#header
		.header-options
		> .header-option
		> .header-option-dropdown
		> option {
		color: var(--font-color);
		font-weight: 500;
		text-transform: uppercase;
	}

	#header .header-options > .header-option > .header-option-choices {
		width: 100%;
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 0.25rem;
		display: flex;
		overflow: hidden;
	}

	#header
		.header-options
		> .header-option
		> .header-option-choices
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
	}

	#header
		.header-options
		> .header-option
		> .header-option-choices
		> .header-option-choice:first-child {
		border-bottom-left-radius: 0.25rem;
		border-top-left-radius: 0.25rem;
	}

	#header
		.header-options
		> .header-option
		> .header-option-choices
		> .header-option-choice:last-child {
		border-bottom-right-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
	}

	#header
		.header-options
		> .header-option
		> .header-option-choices
		> .header-option-choice:hover,
	#header
		.header-options
		> .header-option
		> .header-option-choices
		> .header-option-choice:focus {
		background-color: rgba(255, 255, 255, 0.1);
	}

	#header
		.header-options
		> .header-option
		> .header-option-choices
		> .header-option-choice[data-selected='true'] {
		background-color: white;
		color: var(--theme-primary);
	}

	#content-listings-header-wrapper {
		background: linear-gradient(
			to bottom,
			var(--theme-primary),
			transparent
		);
		padding: 0rem 1rem;
		padding-bottom: 12rem;
	}

	#content-listings-header {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	#content-listings-header > .content-listings-pagination {
		background-color: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.25rem;
		display: flex;
		align-items: center;
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-button {
		height: 2.4rem;
		width: 2.6rem;
		background-color: transparent;
		border: none;
		outline: none;
		color: white;
		font-size: 0.75rem;
		cursor: pointer;
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-button:hover,
	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-button:focus {
		background-color: rgba(255, 255, 255, 0.1);
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-button.double-back {
		border-bottom-left-radius: 0.25rem;
		border-top-left-radius: 0.25rem;
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-button.save-search {
		border-bottom-right-radius: 0.25rem;
		border-top-right-radius: 0.25rem;
		border-left: 1px solid rgba(255, 255, 255, 0.1);
		font-size: 0.75rem;
		font-weight: 500;
		flex-grow: 1;
		text-transform: uppercase;
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-label {
		color: white;
		font-size: 0.9rem;
		line-height: 0.9rem;
		text-align: center;
		padding: 0rem 0.75rem;
	}

	#content-listings-header
		> .content-listings-pagination
		> .content-pagination-label
		> .accent-text {
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.75rem;
		font-weight: 500;
		padding-right: 0.4rem;
		text-transform: uppercase;
	}

	#content-listings-header > .content-listings-pagination-quantity-label {
		color: white;
		font-size: 0.85rem;
		line-height: 0.9rem;
		text-transform: uppercase;
	}

	#content-listings-header
		> .content-listings-pagination-quantity-label
		> .accent-text {
		color: rgba(255, 255, 255, 0.75);
		font-size: 0.6rem;
		font-weight: 500;
	}

	#content-listings {
		display: flex;
		flex-direction: column;

		margin-top: -12rem;
	}

	#content-listings > .listing {
		height: 18rem;
		padding: 1.5rem 0.5rem;
		padding-top: 0.5rem;
		position: relative;
		cursor: pointer;
	}

	#content-listings > .listing:hover,
	#content-listings > .listing:focus {
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(255, 255, 255, 0.15)
		);
	}

	#content-listings > .listing:nth-child(n + 2) {
		border-top: 1px solid rgba(255, 255, 255, 0.1);
		padding-top: 1.5rem;
	}

	#content-listings > .listing > .listing-images {
		border-radius: 0.5rem;
		height: 100%;
		overflow: hidden;
		position: relative;
	}

	#content-listings > .listing > .listing-images > img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		object-position: center;
	}

	#content-listings > .listing > .listing-info-wrapper {
		background: linear-gradient(
			to top,
			rgba(10, 10, 10, 0.6) 30%,
			transparent
		);
		display: flex;
		align-items: flex-end;
		height: 100%;
		width: 100%;
		padding: 1.5rem;
		padding-bottom: 4rem;
		position: absolute;
		left: 0px;
		top: 0px;
		z-index: 1;
	}

	#content-listings > .listing > .listing-info-wrapper > .listing-info {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	#content-listings
		> .listing
		> .listing-info-wrapper
		> .listing-info
		> .listing-info-title {
		color: white;
		font-size: 1.1rem;
	}

	#content-listings
		> .listing
		> .listing-info-wrapper
		> .listing-info
		> .listing-info-details
		> span {
		color: rgba(255, 255, 255, 0.8);
		font-size: 0.8rem;
	}

	#content-listings > .listing > .listing-favorite-button {
		height: 2.5rem;
		width: 2.5rem;
		padding: 0rem;
		background-color: transparent;
		border: none;
		outline: none;
		border-radius: 0.3rem;
		color: white;
		font-size: 1.25rem;
		position: absolute;
		right: 0px;
		bottom: 1.5rem;
		margin: 0.75rem 1.25rem;
		z-index: 3;
		cursor: pointer;
	}

	#content-listings > .listing > .listing-favorite-button:hover,
	#content-listings > .listing > .listing-favorite-button:focus {
		background-color: rgba(255, 255, 255, 0.15);
	}

	@media (max-width: 500px) {
		#phone {
			height: auto;
			width: 100%;
			margin: 0px auto;
		}

		#main-wrapper {
			height: auto;
			padding-bottom: 4rem;
		}
	}
</style>

<script>
	export let sprite = 'pixel-art'
	export let seed = 'avatar'
	let placeholder = sprite
	$: seed = seed == '' ? placeholder : seed
</script>

<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
	<figure class="px-10 pt-10">
		<div class="avatar">
			<div class="w-24 rounded-full">
				<img
					src={`https://avatars.dicebear.com/api/${sprite}/${seed}.svg`}
					alt="Avatar by Dicebear" />
			</div>
		</div>
	</figure>
	<div class="card-body items-center text-center">
		<h2 class="card-title">Profile Picture</h2>
		<div class="card-actions">
			<div class="flex">
				<select class="select select-bordered ">
					<option selected>avatar</option>
					<option>adventurer</option>
					<option>adventurer-neutral</option>
					<option>avataaars</option>
					<option>big-ears</option>
					<option>big-ears-neutral</option>
					<option>big-smile</option>
					<option>bottts</option>
					<option>croodles</option>
					<option>croodles-neutral</option>
					<option>identicon</option>
					<option>initials</option>
					<option>micah</option>
					<option>miniavs</option>
					<option>open-peeps</option>
					<option>personas</option>
					<option>pixel-art</option>
					<option>pixel-art-neutral</option>
				</select>
				<div
					class="tooltip tooltip-info"
					data-tip="Generate avatars based on seed">
					<input
						bind:value={seed}
						type="text"
						{placeholder}
						class="input input-bordered input-info w-full max-w-xs" />
				</div>
			</div>
		</div>
		<div class="alert shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-info flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
				<div>
					<h3 class="font-bold text-xs">
						Powered by Dicebear Avatars
					</h3>
					<div class="text-xs">
						Don't use sensitive or personal data as seed! And please
						check the design licenses before use.
					</div>
				</div>
			</div>
			<div class="flex-none">
				<a
					class="btn btn-sm"
					href="https://avatars.dicebear.com/licenses"
					target="_blank"
					rel="noopener noreferrer">See</a>
			</div>
		</div>
	</div>
</div>

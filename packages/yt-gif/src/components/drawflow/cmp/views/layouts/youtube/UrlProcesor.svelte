<script lang="ts">
	function change(e: { target: { value?: string } }) {
		console.log(e)
		var val = e.target.value ?? '',
			newval: RegExpMatchArray | null

		if ((newval = val.match(/(\?|&)v=([^&#]+)/))) {
			e.target.value = newval.pop()
		} else if ((newval = val.match(/(\.be\/)+([^\/]+)/))) {
			e.target.value = newval.pop()
		} else if ((newval = val.match(/(\embed\/)+([^\/]+)/))) {
			e.target.value = newval.pop()?.replace('?rel=0', '')
		}
	}
</script>

<div class="container">
	<label
		for="website-admin"
		class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
		>YouTube URL Procesor</label>
	<div class="flex shadow-lg">
		<span
			class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
			@
		</span>
		<input
			type="text"
			on:change={change}
			id="website-admin"
			class="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			placeholder="Type here... E.g YSuo0j2xsj8" />
	</div>

	<br />

	<div class="alert w-auto shadow-sm">
		<div>
			<i class="fa-regular fa-film" />
			<span>Types of URL supported:</span>
		</div>
	</div>
	<ul class="menu bg-base-100 w-auto p-2 rounded-box">
		<li>
			<a>
				<i
					class="fa-solid fa-play" />https://www.youtube.com/watch?v=YSuo0j2xsj8
			</a>
		</li>
		<li>
			<a>
				<i class="fa-regular fa-play" />http://youtu.be/YSuo0j2xsj8
			</a>
		</li>
		<li>
			<a>
				<i class="fa-thin fa-play" />www.youtube.com/embed/YSuo0j2xsj8
			</a>
		</li>
	</ul>
</div>

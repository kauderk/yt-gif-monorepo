<script lang="ts">
	import { page } from '$app/stores'
</script>

<div class="hero bg-base-100 min-h-full">
	<div class="hero-content text-center">
		<div class="max-w-md">
			{#if $page.status === 404}
				<h1 class="text-5xl font-bold">{$page.status}</h1>
				<p class="py-6">Nothing to see here...</p>
				<div class="flex flex-col items-center">
					<a class="btn btn-primary w-fit" href="/app"
						>Go back home</a>
				</div>
			{:else if $page.status === 401}
				<h1 class="text-5xl font-bold">{$page.status}</h1>
				<p class="py-6">We need you to login before you can continue</p>
				<div class="flex flex-col items-center btn-group">
					<a
						class="btn btn-primary  w-full"
						href="/login?redirect={$page.url.toString()}">Login</a>
					<a
						class="btn btn-ghost w-full"
						href="/register?redirect={$page.url.toString()}"
						>Register</a>
				</div>
			{:else if $page.status === 403}
				<h1 class="text-5xl font-bold">{$page.status}</h1>
				<p class="py-6">I'm afraid you can't go there</p>
				<div class="flex flex-col items-center">
					<a class="btn btn-primary w-fit" href="/app"
						>Go back home</a>
				</div>
			{:else}
				<h1 class="text-5xl font-bold">{$page.status}</h1>
				<p class="py-6">This was not supposed to happen...</p>
				<div class="flex flex-col items-center">
					<a class="btn btn-primary w-fit" href="/app"
						>Go back home</a>
				</div>
			{/if}
		</div>
	</div>
</div>

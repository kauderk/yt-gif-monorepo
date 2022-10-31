<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '$app/navigation'
	import { auth, currentUser } from '$lib/modules/firebase/client'
	import { firebaseUser } from '$lib/modules/firebase/client'
	import { page } from '$app/stores'
	import UsernameInput from '$lib/components/inputs/UsernameInput.svelte'
	import Dicebear from './Dicebear.svelte'
	let username: string
	let usernameError: string
	let name: string
	let nameError: string
	let finishLoading = false
	async function finish(e: Event) {
		e.preventDefault()

		if (!username) {
			usernameError = 'Username is required'
			finishLoading = false
			return
		}

		if (!name) {
			nameError = 'Name is required'
			finishLoading = false
			return
		}

		try {
			finishLoading = true
			let res = await fetch(`/api/users/${auth.currentUser?.uid}`, {
				method: 'POST',
				mode: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					name,
				}),
			})

			if (res.ok) {
				const body = await res.json()
				currentUser.set(body.user)

				return goto('/app')
			} else {
				usernameError = 'Username is already in use'
				finishLoading = false
			}
		} catch (error) {
			usernameError = 'An unknown error occurred'
			console.error(error)
			finishLoading = false
			return
		}
	}

	let redirectUrl: string | null
	onMount(async () => {
		redirectUrl = $page.url.searchParams.get('redirect')
		console.log(redirectUrl)

		firebaseUser.subscribe(async fbuser => {
			if (fbuser == null) {
				return goto(
					'/register' +
						(redirectUrl ? '?redirect=' + redirectUrl : '')
				)
			}

			try {
				let res = await fetch(`/api/users/${fbuser.uid}`)
				let json = await res.json()
				if (res.status === 200) {
					goto(
						$page.url.searchParams.get('redirect') ??
							`/${json.user.username}`
					)
				}
			} catch (error) {
				console.error(error)
			}
		})
	})
</script>

<div class="hero min-h-full bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<Dicebear seed={username} />

		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form on:submit={finish}>
					<UsernameInput bind:username bind:usernameError />
					<div class="form-control">
						<label for="name" class="label">
							<span class="label-text">Name</span>
						</label>
						<input
							bind:value={name}
							id="name"
							type="text"
							placeholder="name"
							class="input input-bordered"
							autocomplete="name"
							class:input-error={nameError} />
						{#if nameError}
							<label class="label" for="name">
								<span class="label-text-alt text-error"
									>{nameError}</span>
							</label>
						{:else}
							<label class="label" for="name">
								<span class="label-text-alt opacity-50"
									>This is what you'll be called.</span>
							</label>
						{/if}
					</div>
					<div class="form-control mt-6">
						<input
							type="submit"
							value="Finish"
							class="btn btn-primary"
							class:loading={finishLoading}
							disabled={finishLoading || !!usernameError} />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

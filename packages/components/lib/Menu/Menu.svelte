<script>
  import { Logo, Nav } from '../../index';
  import { fade, fly, scale} from 'svelte/transition';

	let _class = null;
	export { _class as class };

  let navOpen = false
  let html = document.documentElement;

  function toggleNav() {
    navOpen = !navOpen
    html.style.overflow = 'hidden';
    html.classList.add('nav-open');
  }

  function closeNav() {
    navOpen = false
    html.removeAttribute('style');
    html.classList.remove('nav-open');
  }

  function handleKeydown(event) {
    if (event.keyCode === 27) {
      closeNav()
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<button on:click={toggleNav} 
        class="{_class || ''} flex items-center justify-center h-9 w-9 relative z-10" 
        aria-label="Menu Button" 
        aria-live="polite">
        <img class="absolute dark:invert headerActive:invert dark:headerActive:invert-0" src="images/icons/menu-2.svg" alt="Menu Buton" />
</button>


{#if navOpen}
  <div in:fade out:fade on:click={closeNav} class="active mobile-nav bg-white dark:bg-black fixed inset-0 z-10 flex flex-col items-center justify-center gap-10 w-full h-full">
      <button on:click={closeNav}
              class="{_class || ''} flex items-center justify-center h-9 w-9 z-10 absolute right-10 top-6" 
              aria-label="Close Button" 
              aria-live="polite">
          <img class="absolute dark:invert" src="images/icons/close.svg" alt="Close Buton" />
      </button>
      <section in:fly={{ x: 40, delay: 120 }}>
        <Logo class="h-20 headerActive" />
      </section>
      <section in:fly={{ x: -40, delay: 120 }}>
        <Nav />
      </section>
  </div>
{/if}
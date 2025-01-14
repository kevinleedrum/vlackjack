<script setup lang="ts">
import { state } from '@/store'

function toggleSound() {
  state.isMuted = !state.isMuted
  localStorage.setItem('isMuted', state.isMuted.toString())
}
</script>

<template>
  <header>
    <a
      class="github"
      aria-label="Source on GitHub"
      href="https://github.com/kevinleedrum/vlackjack"
    >
      <svg role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    </a>
    <h1>Vl<span>a</span>ck<span>j</span>ack</h1>
    <button @click="toggleSound" aria-label="Toggle sound">
      <svg
        v-if="!state.isMuted"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        />
        <path d="M16 9a5 5 0 0 1 0 6" />
        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-volume-off"
      >
        <path d="M16 9a5 5 0 0 1 .95 2.293" />
        <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
        <path d="m2 2 20 20" />
        <path
          d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"
        />
        <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
      </svg>
    </button>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  pointer-events: none;
}
h1 {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
a,
button {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  pointer-events: auto;
  opacity: 0.75;
  color: var(--color-off-white);
}
@media (hover: hover) {
  a:hover,
  button:hover {
    opacity: 1;
  }
  button:hover {
    color: var(--color-black);
  }
}

button {
  padding: 0.625rem;
  background: transparent;
}

button:focus-visible,
button:active {
  color: var(--color-black);
}

@media (min-width: 900px) {
  header {
    padding: 1rem 0;
    right: unset;
    bottom: 0;
    width: 60px;
    height: 100%;
    flex-direction: column;
    background-color: var(--color-black);
  }
  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 32px;
    letter-spacing: 0.1rem;
    color: var(--color-white);
    text-transform: uppercase;
    font-variation-settings: 'wght' 500;
    rotate: -90deg;
    position: relative;
    margin: 0;
    clip: unset;
    height: auto;
    overflow: visible;
  }
}
</style>

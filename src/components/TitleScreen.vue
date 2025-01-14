<script setup lang="ts">
import { playRound, state, resetBank } from '@/store'
import { ref } from 'vue'

const showTitleScreen = ref(true)

function startGame() {
  showTitleScreen.value = false
  resetBank()
  state.isGameOver = false
}
</script>

<template>
  <transition name="fade" @after-leave="playRound">
    <section v-if="showTitleScreen || state.isGameOver" class="title-screen">
      <svg>
        <use href="#flourish" />
      </svg>
      <div>
        <h1>Vl<span>a</span>ck<span>j</span>ack</h1>
        <p>Blackjack Simulator</p>
      </div>
      <transition name="fade" mode="out-in">
        <div class="progress-container" v-if="state.soundLoadProgress < 100">
          <progress :value="state.soundLoadProgress" max="100">
            {{ state.soundLoadProgress }}%
          </progress>
        </div>
        <button v-else @click="startGame">
          {{ state.isGameOver ? 'Play Again' : 'Start Game' }}
        </button>
      </transition>
    </section>
  </transition>
</template>

<style scoped>
.title-screen {
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 3rem;
  background-color: var(--color-dark-cyan);
}
.title-screen > *:not(svg) {
  position: relative;
}
svg {
  position: absolute;
  width: max(86rem, 125vw);
  aspect-ratio: 1;
  opacity: 0.25;
  animation: rotate 120s linear infinite;
}
h1 {
  color: var(--color-white);
  text-transform: uppercase;
  font-size: 6rem;
  letter-spacing: 0.25rem;
  font-variation-settings: 'wght' 700;
}
p {
  text-transform: uppercase;
  margin: 0;
  color: var(--color-white);
  font-size: 2.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
}
button {
  font-size: 2.5rem;
  padding: 1.5rem 2.5rem;
}
.progress-container {
  display: flex;
  align-items: center;
  height: 5.5rem;
}
progress {
  width: 300px;
  height: 1rem;
  border: 0;
  border-radius: 0.5rem;
  overflow: hidden;
  appearance: none;
  background-color: var(--color-black);
  opacity: 0.5;
}
progress::-webkit-progress-bar {
  background-color: var(--color-black);
}
progress::-webkit-progress-value {
  background-color: var(--color-white);
}
progress::-moz-progress-bar {
  background-color: var(--color-white);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>

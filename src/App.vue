<script setup lang="ts">
import { state } from '@/store'
import { onMounted } from 'vue'
import GameHand from '@/components/GameHand.vue'
import SvgSprite from '@/components/SvgSprite.vue'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import { playSound, Sounds, initSound } from '@/sound'
import PlayerToolbar from '@/components/PlayerToolbar.vue'
import TitleScreen from '@/components/TitleScreen.vue'
import GameHeader from '@/components/GameHeader.vue'

onMounted(() => {
  initSound()
})

function onClickCapture(e: MouseEvent) {
  const target = e.target as HTMLButtonElement
  if (target?.tagName === 'BUTTON' && !target?.disabled) {
    playSound(Sounds.Click)
  }
}
</script>

<template>
  <SvgSprite />
  <AnimatedBackground />
  <GameHeader />
  <main @click.capture="onClickCapture">
    <section
      class="player"
      v-for="(player, p) in state.players"
      :key="p"
      :class="{ dealer: player.isDealer }"
    >
      <GameHand v-for="hand in player.hands" :hand="hand" :player="player" :key="hand.id" />
    </section>
    <PlayerToolbar />
  </main>
  <TitleScreen />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8rem;
  padding-bottom: 8rem;
  height: 100%;
  padding: 2rem 1rem 1rem 1rem;
}
section.player {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  min-height: 11.2rem;
}
section.player:not(.dealer) {
  flex-grow: 1;
}
section.player.dealer {
  z-index: -1;
}
</style>

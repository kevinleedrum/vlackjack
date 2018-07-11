<template>
  <main
    @click="closeDrawer"
    :class="{ 'is-dimmed': showDrawer }"
    class="game-area"
  >
    <section class="dealer-side">
      <GameHand
        v-if="hands.length"
        :hand="hands[0]"
        :index="0"
      />
    </section>
    <section class="player-side">
      <GameHand
        v-for="(hand, i) in hands"
        :key ="i"
        v-if="i > 0"
        :hand="hand"
        :index="i"
      />
    </section>
    <TheControls :class="{ 'no-pointer-events': showDrawer }" />
  </main>
</template>

<script>
import GameHand from './TheGameArea/GameHand'
import TheControls from './TheGameArea/TheControls'
import { mapState } from 'vuex'
export default {
  components: {
    GameHand,
    TheControls
  },
  computed: {
    ...mapState([
      'activeHandIndex',
      'hands',
      'showDrawer'
    ])
  },
  methods: {
    closeDrawer () {
      this.$store.commit('toggleDrawer', { show: false })
    }
  }
}
</script>

<style scoped>
.game-area {
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  z-index: 50;
}
.is-dimmed {
  opacity: 0.5;
}
.no-pointer-events {
  pointer-events: none;
}
.dealer-side {
  margin-top: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  min-height: 12.4rem;
}
.player-side {
  flex: 1 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
}
</style>

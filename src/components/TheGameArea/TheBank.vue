<template>
    <span
      class="bank"
      :class="{ 'is-increasing': isIncreasing }"
    >
      <GameCoin :class="{ 'is-spinning': isIncreasing }" />
      <small>&times;</small>
      <span class="number">{{ $store.state.bank }}</span>
    </span>
</template>

<script>
import GameCoin from './GameCoin'
export default {
  components: {
    GameCoin
  },
  data () {
    return {
      isIncreasing: false
    }
  },
  watch: {
    '$store.state.bank': function (current, previous) {
      if (current > previous) {
        const { startingBank, minimumBet } = this.$store.state.settings
        if (previous === 0 && current === startingBank - minimumBet) return // do not animate starting bank
        if (current > previous) this.isIncreasing = true
        setTimeout(() => { this.isIncreasing = false }, 1000)
      }
    }
  }
}
</script>

<style scoped>
.bank {
  background: rgba(0, 0, 0, 0.1);
  height: 4rem;
  display: inline-flex;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1em;
  font-weight: 500;
  font-size: 3rem;
  color: #E1AE0F;
  transition: all 0.2s ease;
}
.bank small {
  font-size: 2rem;
  font-weight: 300;
  margin: 0.5rem;
}
.bank.is-increasing {
  background: rgba(0, 0, 0, 0.2);
}
.bank .number {
  transition: all 0.2s ease;
}
.bank.is-increasing .number {
  transform: scale(1.1);
}
.is-spinning {
  animation: spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes spin {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(6 * 360deg);
  }
}
</style>

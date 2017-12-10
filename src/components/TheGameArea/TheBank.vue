<template>
    <span class="bank">
      <GameCoin />
      <small>&times;</small> 
      <span class="number">{{ $store.state.bank }}</span>
    </span>
</template>

<script>
import GameCoin from './GameCoin';
export default {
  components: {
    GameCoin
  },
  watch: {
    '$store.state.bank': function (current, previous) {
      if (current > previous) {
        const { startingBank, minimumBet } = this.$store.state.settings;
        if (previous === 0 && current === startingBank - minimumBet) return; // do not animate starting bank
        if (current > previous) this.$el.classList.add('is-increasing');
        setTimeout(() => { this.$el.classList.remove('is-increasing'); }, 1000);
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../style/global.scss';

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
  color: $gold;
  transition: all 0.2s ease;
}
.bank small {
  font-size: 2rem;
  font-weight: 300;
  margin: 0.5rem;
}
.bank .number {
  transition: all 0.3s;
}
.bank.is-increasing {
  background: rgba(0, 0, 0, 0.2);
}
.bank.is-increasing .number {
  font-weight: 800;
}
.bank .game-coin {
  width: 3rem;
  height: 3rem;
}
.bank.is-increasing .game-coin {
  animation: coin-spin 1s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes coin-spin {
  0% {
    transform: rotateY(0);
  }
  100% {
    transform: rotateY(6 * 360deg);
  }
}
</style>
<template>
  <transition-group
    name="coin"
    tag="div"
    class="hand-bet"
    :class="{ 'is-win': isWin, 'is-loss': isLoss }"
  >
    <GameCoin
      v-for="(bet, i) in hand.bets"
      :key="i"
      class="hand-coin"
    />
  </transition-group>
</template>

<script>
import GameCoin from '../GameCoin';
import blackjack from '@/lib/blackjack';
const { PUSH, BUST, BLACKJACK, WIN, LOSE } = blackjack.results;
export default {
  props: {
    hand: {
      type: Object,
      required: true
    }
  },
  components: {
    GameCoin
  },
  computed: {
    isLoss () {
      return [LOSE, BUST].includes(this.hand.result);
    },
    isWin () {
      return [PUSH, WIN, BLACKJACK].includes(this.hand.result);
    }
  }
};
</script>

<style scoped>
.hand-bet {
  position: absolute;
  bottom: -4rem;
  left: 0;
  width: 100%;
  text-align: center;
}
.hand-bet .hand-coin {
  margin: 0.1rem;
  transition: all 0.3s ease-in;
}
.coin-leave-to, .is-win .coin-enter {
  transform: translateY(-50vh);
  opacity: 0;
}
.coin-enter, .is-win .coin-leave-to {
  transform: translateY(50vh);
  opacity: 0;
}
</style>
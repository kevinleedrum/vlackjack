<template>
  <transition name="pop">
    <span
      v-if="total"
      class="hand-total text-secondary-color"
      :class="{ 'bg-red': total > 21, 'bg-gold': total === 21 }">
      {{ total }}
    </span>
  </transition>
</template>

<script>
import blackjack from '@/lib/blackjack'
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    total () {
      const hand = this.$store.state.hands[this.index]
      if (hand.cards.length < 2) return
      if (hand.cards.find(card => card.isFaceDown)) return
      return blackjack.score(hand.cards)
    }
  }
}
</script>

<style scoped>
.hand-total {
  display: inline-block;
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 2em;
  background: #fff;
  border-radius: 50%;
  text-align: center;
}
.pop-enter-active {
  transition: all 0.3s ease-out;
}
.pop-leave-active {
  transition: all 0.1s ease-in;
}
.pop-enter, .pop-leave-to {
  transform: scale(0) rotate(360deg);
}
</style>

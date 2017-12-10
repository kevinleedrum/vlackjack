<template>
    <span
      class="bank"
      :class="{ 'is-increasing': isIncreasing }"
    >
      <GameCoin :is-spinning="isIncreasing" />
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
  data () {
    return {
      isIncreasing: false
    }
  },
  watch: {
    '$store.state.bank': function (current, previous) {
      if (current > previous) {
        const { startingBank, minimumBet } = this.$store.state.settings;
        if (previous === 0 && current === startingBank - minimumBet) return; // do not animate starting bank
        if (current > previous) this.isIncreasing = true;
        setTimeout(() => { this.isIncreasing = false; }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>

<template>
  <div
    class="card"
    :class="{ 'face-down': isFaceDown }"
  >
    <div class="front">
      <div class="top-corner">
        <PlayingCardValue :value="card.value" :suit="card.suit" />
        <PlayingCardSuit :suit="card.suit" />
      </div>
    </div>
    <div class="back" />
  </div>
</template>

<script>
import PlayingCardValue from './PlayingCardValue'
import PlayingCardSuit from './PlayingCardSuit'
export default {
  components: {
    PlayingCardValue,
    PlayingCardSuit
  },
  props: {
    card: {
      type: Object,
      required: true
    },
    isFaceDown: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: inline-block;
  width: 8rem;
  height: 12rem;
  margin: 0.2rem;
  transition: all 0.2s ease;
}
.card .front, .card .back {
  border-radius: 0.75rem;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  backface-visibility: hidden;
  transition: transform 0.5s;
  transform-style: preserve-3d;
}
.card .front {
  background-image: url('../../../assets/card-front.svg');
  background-color: $secondary-color;
}
.card .back {
  background-image: url('../../../assets/card-back.svg');
  transform: rotateY(-180deg);
  background-color: $red;
}
.card.face-down .back {
  transform: rotateY(0deg);
}
.card.face-down .front {
  transform: rotateY(180deg);
}
.card .top-corner {
  position: absolute;
  text-align: center;
  top: 0.5rem;
  left: 0.5rem;
  width: 3rem;
  height: 6.1rem;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-items: stretch;
}
</style>

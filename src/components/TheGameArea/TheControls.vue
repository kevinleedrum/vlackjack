<template>
  <div class="controls-row">
    <div class="controls">
      <TheControlsButton action="doubleDown" :is-enabled="canDoubleDown && isPlayerTurn" />
      <TheControlsButton action="split" :is-enabled="canSplit && isPlayerTurn" />
      <TheBank />
      <TheControlsButton action="stand" :is-enabled="isPlayerTurn" />
      <TheControlsButton action="hit" :is-enabled="isPlayerTurn" />
    </div>
  </div>
</template>

<script>
import TheControlsButton from './TheControlsButton';
import TheBank from './TheBank';
import { mapGetters, mapState } from 'vuex';
export default {
  components: {
    TheControlsButton,
    TheBank
  },
  computed: {
    isPlayerTurn () {
      return !this.isDealing && this.activeHandIndex > 0;
    },
    ...mapState([
      'isDealing',
      'activeHandIndex'
    ]),
    ...mapGetters([
      'canSplit',
      'canDoubleDown'
    ])
  }
};
</script>

<style>
.controls-row {
  text-align: center;
}
.controls {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
</style>

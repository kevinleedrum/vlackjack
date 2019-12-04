<template>
  <div class="controls-row">
    <div class="controls">
      <GameButton
        action="doubleDown"
        :is-enabled="canDoubleDown && isPlayerTurn"
      />
      <GameButton
        action="split"
        :is-enabled="canSplit && isPlayerTurn"
      />
      <TheBank />
      <GameButton
        action="stand"
        :is-enabled="isPlayerTurn"
      />
      <GameButton
        action="hit"
        :is-enabled="isPlayerTurn"
      />
    </div>
  </div>
</template>

<script>
import GameButton from './GameButton'
import TheBank from './TheBank'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    GameButton,
    TheBank
  },
  computed: {
    isPlayerTurn () {
      return !this.isDealing && this.activeHandIndex > 0
    },
    ...mapState([
      'isDealing',
      'isTvMode',
      'activeHandIndex'
    ]),
    ...mapGetters([
      'canSplit',
      'canDoubleDown'
    ])
  },
  watch: {
    isPlayerTurn (isPlayerTurn) {
      if (isPlayerTurn && this.isTvMode) this.$nextTick(() => this.focusButton(-1))
    }
  },
  mounted () {
    window.addEventListener('keydown', e => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return
      const direction = e.key === 'ArrowRight' ? 1 : -1
      this.focusButton(direction)
    })
  },
  methods: {
    focusButton (direction) {
      const buttons = Array.from(document.querySelectorAll('.controls button'))
      if (buttons.every(e => e.disabled)) return
      const buttonIndex = buttons.indexOf(document.activeElement)
      let newButtonIndex = buttonIndex + direction
      if (newButtonIndex < 0) newButtonIndex = 3
      if (newButtonIndex > 3) newButtonIndex = 0
      if (buttons[newButtonIndex].disabled) this.focusButton(direction > 0 ? direction + 1 : direction - 1)
      else buttons[newButtonIndex].focus()
    }
  }
}
</script>

<style scoped>
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

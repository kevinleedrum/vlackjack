<template>
  <div class="game-over">
    <GameButton
      action="restart"
      :is-enabled="true"
    />
  </div>
</template>

<script>
import GameButton from '@/components/TheGameArea/GameButton'
export default {
  components: {
    GameButton
  }
}
</script>

<style scoped>
.game-over {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
}
</style>

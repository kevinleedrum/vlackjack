<template>
  <div class="game">
    <TheStars />
    <TheSidebar />
    <TheGameArea />
    <TheMenuButton />
    <TheTitleScreen v-if="$store.state.isTitleShowing" />
  </div>
</template>

<script>
import TheTitleScreen from '@/components/TheTitleScreen'
import TheSidebar from '@/components/TheSidebar'
import TheStars from '@/components/TheGameArea/TheStars'
import TheGameArea from '@/components/TheGameArea'
import TheMenuButton from '@/components/TheMenuButton'
export default {
  components: {
    TheTitleScreen,
    TheSidebar,
    TheStars,
    TheGameArea,
    TheMenuButton
  }
}
</script>

<style lang="scss">
.game {
  display: flex;
  flex-flow: row nowrap;
}
html, body, .game {
  height: 100%;
  overflow: hidden;
  margin: 0;
}
html {
  font-size: 16px;
}
@media (max-height: 768px) {
  html {
  font-size: calc(5px + 0.5vh);
  }
}
body {
  background: $primary-color;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
:focus {
  outline: 0 !important;
}
* {
  user-select: none;
}
.text-red {
  color: #E04030;
}
.text-secondary-color {
  color: rgb(12, 36, 48);
}
.text-gold {
  color: #E1AE0F;
}
.text-white {
  color: $white;
}
</style>

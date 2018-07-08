<template>
  <div class="game">
    <TheSidebar />
    <TheGameArea />
    <TheTitleScreen v-if="$store.state.isTitleShowing" />
  </div>
</template>

<script>
import TheTitleScreen from '@/components/TheTitleScreen'
import TheSidebar from '@/components/TheSidebar'
import TheGameArea from '@/components/TheGameArea'
export default {
  components: {
    TheTitleScreen,
    TheSidebar,
    TheGameArea
  }
}
</script>

<style>
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
  background: rgb(63, 111, 194);
  font-family: 'Helvetica', 'Arial', sans-serif;
}
:focus {
  outline: 0 !important;
}
* {
  user-select: none;
}
.bg-red {
  background: #E04030;
}
.text-red {
  color: #E04030;
}
.bg-secondary-color {
  background: rgb(12, 36, 48);
}
.text-secondary-color {
  color: rgb(12, 36, 48);
}
.bg-gold {
  background: #E1AE0F;
}
.text-gold {
  color: #E1AE0F;
}
.text-white {
  color: #fff;
}
</style>

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
body {
  background: #008DC9;
  font-family: 'Helvetica', 'Arial', sans-serif;
}
:focus {
  outline: 0 !important;
}
* {
  user-select: none;
}
.bg-red {
  background: #E35000;
}
.text-red {
  color: #E35000;
}
.bg-secondary-color {
  background: #1F3C40;
}
.text-secondary-color {
  color: #1F3C40;
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

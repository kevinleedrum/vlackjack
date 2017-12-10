<template>
  <div class="game">
    <TheSidebar />
    <TheGameArea />
    <TheTitleScreen v-if="$store.state.isTitleShowing" />
  </div>
</template>

<script>
import TheTitleScreen from '@/components/TheTitleScreen';
import TheSidebar from '@/components/TheSidebar';
import TheGameArea from '@/components/TheGameArea';
export default {
  components: {
    TheTitleScreen,
    TheSidebar,
    TheGameArea
  }
};
</script>

<style lang="scss">
@import './style/global.scss';

.game {
  display: flex;
  flex-flow: row nowrap;
}
html, body, .game {
  height: 100%;
  overflow: hidden;
}
html {
  font-size: 16px;
  @media (max-height: 768px) {
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
  -moz-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
}
</style>
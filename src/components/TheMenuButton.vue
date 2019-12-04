<template>
  <button v-if="!isTvMode" @click="toggleDrawer" class="menu-button">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve">
    <path v-if="!showDrawer" d="M444.8,291.1l42.6,24.6c4.9,2.8,7.1,8.6,5.5,14c-11.1,35.6-30,67.8-54.7,94.6c-3.8,4.1-10,5.1-14.8,2.3
      l-42.6-24.6c-17.9,15.4-38.5,27.3-60.8,35.1v49.2c0,5.6-3.9,10.5-9.4,11.7c-35,7.9-72.5,8.3-109.2,0c-5.5-1.2-9.4-6.1-9.4-11.7
      v-49.2c-22.2-7.9-42.8-19.8-60.8-35.1l-42.6,24.6c-4.9,2.8-11,1.9-14.8-2.3c-24.7-26.7-43.6-58.9-54.7-94.6
      c-1.7-5.4,0.6-11.2,5.5-14l42.6-24.6c-4.3-23.2-4.3-47,0-70.2l-42.6-24.6c-4.9-2.8-7.1-8.6-5.5-14c11.1-35.6,30-67.8,54.7-94.6
      c3.8-4.1,10-5.1,14.8-2.3l42.6,24.6c17.9-15.4,38.5-27.3,60.8-35.1V25.8c0-5.6,3.9-10.5,9.4-11.7c35-7.8,72.5-8.3,109.2,0
      c5.5,1.2,9.4,6.1,9.4,11.7v49.2c22.2,7.9,42.8,19.8,60.8,35.1l42.6-24.6c4.9-2.8,11-1.9,14.8,2.3c24.7,26.7,43.6,58.9,54.7,94.6
      c1.7,5.4-0.6,11.2-5.5,14l-42.6,24.6C449.1,244.1,449.1,267.9,444.8,291.1L444.8,291.1z M336,256c0-44.1-35.9-80-80-80
      s-80,35.9-80,80s35.9,80,80,80S336,300.1,336,256z"/>
    <path v-else d="M466.5,449.5c4.7,4.7,4.7,12.3,0,17c-2.3,2.3-5.4,3.5-8.5,3.5s-6.1-1.2-8.5-3.5L256,273L62.5,466.5
      c-2.3,2.3-5.4,3.5-8.5,3.5s-6.1-1.2-8.5-3.5c-4.7-4.7-4.7-12.3,0-17L239,256L45.5,62.5c-4.7-4.7-4.7-12.3,0-17
      c4.7-4.7,12.3-4.7,17,0L256,239L449.5,45.5c4.7-4.7,12.3-4.7,17,0c4.7,4.7,4.7,12.3,0,17L273,256L466.5,449.5z"/>
    </svg>
  </button>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState([ 'isTvMode', 'showDrawer' ])
  },
  methods: {
    ...mapMutations([ 'toggleDrawer' ])
  }
}
</script>

<style lang="scss" scoped>
.menu-button {
  display: none !important;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 6rem;
  height: 6rem;
  min-width: 48px;
  min-height: 48px;
  z-index: 100;
  background: transparent;
  border: 0;
  opacity: 0.5;
  cursor: pointer;
}
.menu-button svg {
  width: 66.6%;
  height: 66.6%;
  fill: $white;
}
@media (max-width: 1199px) {
  .menu-button {
    display: flex !important;
  }
}
.menu-button:hover {
  opacity: 0.75;
}
.line {
  height: 1px;
  background: $white;
  width: 24px;
}
</style>

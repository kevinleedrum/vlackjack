<template>
  <button @click="toggleDrawer" class="menu-button">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </button>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations([ 'toggleDrawer' ])
  }
}
</script>

<style lang="scss" scoped>
.menu-button {
  display: none !important;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 8px;
  left: 8px;
  width: 48px;
  height: 48px;
  z-index: 100;
  background: transparent;
  border: 0;
  color: $white;
  border: 1px solid $white;
  padding: 8px;
  border-radius: 8px;
  opacity: 0.6;
}
@media (max-width: 1199px) {
  .menu-button {
    display: flex !important;
  }
}
.menu-button:hover {
  opacity: 1;
}
.line {
  height: 1px;
  background: $white;
  width: 24px;
}
</style>

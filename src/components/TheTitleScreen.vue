<template>
  <transition name="fade">
    <div class="title-screen">
      <GameLogo />
      <svg id="orbits" viewBox="0 0 182 63.95">
        <circle id="orbits-sun" cx="91" cy="31.97" r="31.97" fill="#fff" opacity="0.75"/>
        <ellipse id="orbits-ring-2" cx="91" cy="31.97" rx="57.63" ry="13.9" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" opacity="0.5"/>
        <ellipse id="orbits-ring-1" cx="91" cy="31.97" rx="75.79" ry="18.28" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" opacity="0.5"/>
        <ellipse id="orbits-ring-3" cx="91" cy="31.97" rx="90" ry="21.71" fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="2" opacity="0.5"/>
        <circle id="orbits-planet-1" cx="120.61" cy="48.95" r="8.68" fill="#fff" opacity="0.5"/>
        <circle id="orbits-planet-2" cx="42.45" cy="24.47" r="6.32" fill="#fff" opacity="0.5"/>
        <circle id="orbits-planet-3" cx="142.71" cy="49.74" r="3.16" fill="#fff" opacity="0.5"/>
      </svg>
    </div>
  </transition>
</template>

<script>
import GameLogo from './GameLogo';
export default {
  components: {
    GameLogo
  },
  mounted () {
    setTimeout(() => { this.$store.dispatch('startNewGame'); }, 2000);
  }
};
</script>

<style lang="scss" scoped>
@import '../style/global.scss';
.title-screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: $secondary-color;
  color: $gold;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  font-weight: 100;
  letter-spacing: 0.5rem;
  transition: all 0.2s;
}
#logo {
  width: 45%;
  @media (max-width: 1023px) {
    width: 90%;
  }
}
#orbits {
  width: 20%;
  @media (max-width: 1023px) {
    width: 40%;
  }
  opacity: 0.25;
  margin: 2rem;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

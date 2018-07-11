<template>
  <aside class="sidebar" :class="{ 'open': showDrawer }">
    <GameLogo />
    <p class="tagline">
      Built with
      <a
        href="https://vuejs.org/"
        title="vuejs.org"
        target="_blank"
      >
        Vue.js
      </a>
    </p>
    <a
      href="https://github.com/kevinleedrum/vlackjack/"
      title="GitHub project page"
      class="github-link"
    >
      <i class="github-logo"></i>
      <span>GitHub</span>
    </a>
    <p class="byline">
      &copy; 2017&ndash;{{ new Date().getFullYear() }}
      <a
        href="https://linkedin.com/in/kevinleedrum/"
        title="linkedin"
        target="_blank"
      >
        Kevin Lee Drum
      </a>
    </p>
  </aside>
</template>

<script>
import { mapState } from 'vuex'
import GameLogo from './GameLogo'
export default {
  components: {
    GameLogo
  },
  computed: {
    ...mapState([ 'showDrawer' ])
  },
  methods: {
    closeDrawer () {
      this.$store.commit('toggleDrawer', { show: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex !important;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 320px;
  font-size: 0.85em;
  color: $white;
  z-index: 100;
  background: $secondary-color;
  height: 100%;
  transition: transform 0.2s ease-in;
}
@media (max-width: 1199px) {
  .sidebar {
    position: absolute;
    transform: translateX(-320px);
  }
  .sidebar.open {
    transform: translateX(0px);
  }
}
.tagline, .github-link {
  text-transform: uppercase;
  letter-spacing: 0.1rem;
}
.sidebar #logo {
  width: 90%;
}
.sidebar p {
  margin: 1rem 0;
  text-align: center;
}
.sidebar p a {
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}
.sidebar p a:hover {
  border-color: $white;
}
.github-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid $white;
  color: $white;
  text-decoration: none;
  opacity: 0.5;
  width: 50%;
  border-radius: 2rem;
  padding: 0.25rem;
}
.github-link:hover {
  opacity: 1;
}
.github-logo {
  display: inline-block;
  background: url('../assets/github.svg') no-repeat;
  width: 1.5rem;
  height: 1.5rem;
}
.github-link span {
  padding-left: 0.5rem;
}
.byline {
  position: absolute;
  bottom: 0;
}
</style>

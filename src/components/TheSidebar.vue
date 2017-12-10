<template>
  <aside class="sidebar">
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
      &copy; 2017
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
import GameLogo from './GameLogo';
export default {
  components: {
    GameLogo
  }
};
</script>

<style lang="scss">
@import '../style/global.scss';

.sidebar {
  display: flex;
  @media (max-width: 1023px) {
    display: none;
  }
  flex-flow: column;
  justify-content: center;
  align-items: center;
  background-color: $secondary-color;
  width: 20vw;
  font-size: 0.85em;
  color: #fff;
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
  border-color: #fff;
}
.github-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fff;
  color: #fff;
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

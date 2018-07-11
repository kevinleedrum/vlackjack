<template>
  <a class="game-button"
    :class="{ 'is-disabled': !isEnabled, 'is-highlighted': isHighlighted }"
    @click="doAction"
  >
    <svg style="display: none">
      <symbol id="dealRound" viewBox="0 0 88 88">
        <path d="M22.36,43h5.26c4.43,0,7.49,3,7.49,7v0c0,4-3.06,7-7.49,7H22.36Zm5.26,11.84a4.6,4.6,0,0,0,4.89-4.75v0a4.63,4.63,0,0,0-4.89-4.79H24.84v9.59Z" transform="translate(-6 -6)" />
        <path d="M38.15,43H48.61v2.22h-8v3.67H47.7V51.1H40.63v3.79h8.08V57.1H38.15Z" transform="translate(-6 -6)" />
        <path d="M56.9,42.9h2.3l6.2,14.2H62.79l-1.43-3.4H54.69l-1.45,3.4H50.7Zm3.54,8.6L58,45.86,55.6,51.5Z" transform="translate(-6 -6)" />
        <path d="M67.75,43h2.48V54.84h7.41V57.1H67.75Z" transform="translate(-6 -6)" />
      </symbol>
      <symbol id="doubleDown" viewBox="0 0 88 88">
        <path d="M14.37,35.58h4.35c3.67,0,6.2,2.52,6.2,5.8v0a5.84,5.84,0,0,1-6.2,5.84H14.37Zm4.35,9.81a3.8,3.8,0,0,0,4.05-3.94v0a3.83,3.83,0,0,0-4.05-4h-2.3v7.94Z" transform="translate(-6 -6)" />
        <path d="M26.87,41.45v0a6.1,6.1,0,0,1,12.21,0v0a6.1,6.1,0,0,1-12.21,0Zm10.06,0v0a4,4,0,0,0-4-4.15A4,4,0,0,0,29,41.38v0a4,4,0,0,0,4,4.15A3.94,3.94,0,0,0,36.93,41.45Z" transform="translate(-6 -6)" />
        <path d="M41.44,42.3V35.58H43.5v6.64c0,2.17,1.12,3.34,3,3.34s2.94-1.1,2.94-3.25V35.58h2.05V42.2c0,3.49-2,5.24-5,5.24S41.44,45.69,41.44,42.3Z" transform="translate(-6 -6)" />
        <path d="M54.45,35.58h5.24a4.21,4.21,0,0,1,3.05,1,2.62,2.62,0,0,1,.78,1.93v0a2.78,2.78,0,0,1-1.67,2.6c1.37.47,2.32,1.25,2.32,2.84v0c0,2.08-1.72,3.2-4.32,3.2h-5.4Zm4.82,4.92c1.32,0,2.2-.52,2.2-1.58v0c0-.92-.73-1.48-2.05-1.48h-3v3.1Zm.6,4.94c1.4,0,2.25-.55,2.25-1.6v0c0-1-.78-1.57-2.4-1.57H56.47v3.2Z" transform="translate(-6 -6)" />
        <path d="M66.68,35.58h2.05v9.81h6.14v1.87H66.68Z" transform="translate(-6 -6)" />
        <path d="M76.89,35.58h8.66v1.83h-6.6v3h5.85v1.83H78.94v3.14h6.69v1.83H76.89Z" transform="translate(-6 -6)" />
        <path d="M22,52.75h4.35c3.67,0,6.2,2.52,6.2,5.8v0a5.84,5.84,0,0,1-6.2,5.84H22Zm4.35,9.81a3.8,3.8,0,0,0,4.05-3.94v0a3.83,3.83,0,0,0-4.05-4h-2.3v7.94Z" transform="translate(-6 -6)" />
        <path d="M34.53,58.62v0a6.1,6.1,0,0,1,12.21,0v0a6.1,6.1,0,0,1-12.21,0Zm10.06,0v0a4,4,0,0,0-4-4.15,3.94,3.94,0,0,0-3.94,4.12v0a4,4,0,0,0,4,4.15A3.94,3.94,0,0,0,44.59,58.62Z" transform="translate(-6 -6)" />
        <path d="M47.78,52.75H50l2.79,8.66,2.87-8.69h1.73l2.87,8.69L63,52.75H65.2L61.13,64.5H59.36l-2.87-8.39L53.62,64.5H51.85Z" transform="translate(-6 -6)" />
        <path d="M67.22,52.75h1.9l6.25,8.07V52.75h2V64.42H75.68l-6.44-8.31v8.31h-2Z" transform="translate(-6 -6)" />
      </symbol>
      <symbol id="hit" viewBox="0 0 88 88">
        <path d="M34,43h2.48v5.86h6.73V43h2.48V57H43.25V51.11H36.52V57H34Z" transform="translate(-6 -6)" />
        <path d="M49.57,43h2.48V57H49.57Z" transform="translate(-6 -6)" />
        <path d="M59,45.25H54.52V43H66v2.3H61.49V57H59Z" transform="translate(-6 -6)" />
      </symbol>
      <symbol id="split" viewBox="0 0 88 88">
        <path d="M22,55l1.49-1.77a6.49,6.49,0,0,0,4.45,1.83c1.53,0,2.5-.71,2.5-1.77v0c0-1-.56-1.55-3.18-2.16-3-.73-4.69-1.61-4.69-4.21v0c0-2.42,2-4.09,4.81-4.09a7.82,7.82,0,0,1,5.12,1.77L31.13,46.4a6.4,6.4,0,0,0-3.83-1.45c-1.45,0-2.3.75-2.3,1.67v0c0,1.09.64,1.57,3.34,2.22,3,.73,4.53,1.79,4.53,4.13v0c0,2.64-2.07,4.21-5,4.21A8.68,8.68,0,0,1,22,55Z" transform="translate(-6 -6)" />
        <path d="M35.86,43h5.56c3.28,0,5.36,1.87,5.36,4.71v0c0,3.16-2.54,4.81-5.64,4.81h-2.8V57H35.86Zm5.36,7.33c1.87,0,3-1,3-2.52v0c0-1.65-1.19-2.52-3-2.52H38.34v5.08Z" transform="translate(-6 -6)" />
        <path d="M49.29,43h2.48V54.79h7.41V57H49.29Z" transform="translate(-6 -6)" />
        <path d="M61.66,43h2.48V57H61.66Z" transform="translate(-6 -6)" />
        <path d="M71.07,45.25H66.6V43H78v2.3H73.57V57h-2.5Z" transform="translate(-6 -6)" />
      </symbol>
      <symbol id="stand" viewBox="0 0 88 88">
        <path d="M15.19,55l1.49-1.77a6.49,6.49,0,0,0,4.45,1.83c1.53,0,2.5-.71,2.5-1.77v0c0-1-.56-1.55-3.18-2.16-3-.73-4.69-1.61-4.69-4.21v0c0-2.42,2-4.09,4.81-4.09a7.82,7.82,0,0,1,5.12,1.77L24.35,46.4a6.4,6.4,0,0,0-3.83-1.45c-1.45,0-2.3.75-2.3,1.67v0c0,1.09.64,1.57,3.34,2.22,3,.73,4.53,1.79,4.53,4.13v0c0,2.64-2.07,4.21-5,4.21A8.68,8.68,0,0,1,15.19,55Z" transform="translate(-6 -6)" />
        <path d="M32.43,45.25H28V43H39.4v2.3H34.93V57h-2.5Z" transform="translate(-6 -6)" />
        <path d="M45.15,42.85h2.3L53.65,57H51l-1.43-3.4H42.94L41.48,57H38.95Zm3.54,8.6-2.44-5.64-2.42,5.64Z" transform="translate(-6 -6)" />
        <path d="M56,43h2.3l7.55,9.75V43h2.44V57H66.2L58.43,47V57H56Z" transform="translate(-6 -6)" />
        <path d="M72.06,43h5.26c4.43,0,7.49,3,7.49,7v0c0,4-3.06,7-7.49,7H72.06Zm5.26,11.84A4.6,4.6,0,0,0,82.22,50v0a4.63,4.63,0,0,0-4.89-4.79H74.54v9.59Z" transform="translate(-6 -6)" />
      </symbol>
    </svg>
    <svg>
      <use :xlink:href="'#' + action"></use>
    </svg>
    <div class="dot"></div>
  </a>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      required: true
    },
    isEnabled: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isHighlighted () {
      if (!this.$store.state.settings.showBasicStrategy) return
      return this.$store.getters.basicStrategyMove === this.action
    }
  },
  methods: {
    doAction () {
      if (this.isEnabled) this.$store.dispatch(this.action, {})
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  fill: currentColor;
  color: $secondary-color;
}
.game-button {
  display: inline-block;
  padding: 0 0.5rem;
  max-width: 8rem;
  height: 6rem;
  border: 0;
  margin: 0 0.5rem;
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 2em;
  transition: opacity 0.2s ease;
  box-shadow: 0 0.25rem 0 0 rgba(0, 0, 0, 0.25);
  transform: translateY(-0.125rem);
  cursor: pointer;
}
.game-button svg {
  width: 100%;
  height: 100%;
}
.game-button.is-disabled {
  cursor: default;
  opacity: 0.25;
}
.game-button.is-disabled svg {
  opacity: 0.5;
}
.game-button .dot {
  display: none;
}
.game-button.is-highlighted:not(.is-disabled) .dot {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: $gold;
}
.game-button:not(.is-disabled):not(:active):hover {
  background-color: $white;
  transform: translateY(-0.25rem);
  box-shadow: 0 0.375rem 0 0 rgba(0, 0, 0, 0.25);
}
.game-button:not(.is-disabled):active {
  box-shadow: 0 0 0;
  transform: translateY(0);
}
</style>

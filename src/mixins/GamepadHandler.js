export default {
  data () {
    return {
      pollInterval: undefined,
      isLeftPressed: false,
      isRightPressed: false,
      isSelectPressed: false
    }
  },
  mounted () {
    const gamepads = navigator.getGamepads()
    if (!gamepads || !gamepads.length) {
      window.addEventListener('gamepadconnected', this.startPolling)
    } else {
      this.startPolling()
    }
  },
  beforeDestroy () {
    window.removeEventListener('gamepadconnected', this.startPolling)
    window.removeEventListener('gamepaddisconnected', this.stopPolling)
  },
  watch: {
    isSelectPressed (isPressedNow, isPressedBefore) {
      if (isPressedNow && !isPressedBefore) this.clickButton()
    },
    isLeftPressed (isPressedNow, isPressedBefore) {
      if (isPressedNow && !isPressedBefore) this.focusButton(-1)
    },
    isRightPressed (isPressedNow, isPressedBefore) {
      if (isPressedNow && !isPressedBefore) this.focusButton(1)
    }
  },
  methods: {
    startPolling () {
      this.pollInterval = setInterval(this.pollGamepad, 20)
      window.addEventListener('gamepaddisconnected', this.stopPolling)
    },
    stopPolling () {
      clearInterval(this.pollInterval)
    },
    pollGamepad () {
      const gamepads = navigator.getGamepads()
      if (!gamepads || !gamepads.length) return
      const gamepad = gamepads[0]
      const isPressed = button => typeof button === 'object' ? button.pressed : button === 1.0
      const isLeft = axis => axis < -0.25
      const isRight = axis => axis > 0.25
      this.isSelectPressed = gamepad.buttons.slice(0, 3).some(isPressed)
      this.isLeftPressed = isLeft(gamepad.axes[0])
      this.isRightPressed = isRight(gamepad.axes[0])
    }
  }
}

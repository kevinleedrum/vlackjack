<template>
  <div class="stars-container">
    <div class="stars">
      <svg
        v-for="(starStyle, i) in starStyles"
        :key="i"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        :style="starStyle"
      >
        <path opacity="0.1" fill="currentColor" class="text-white" d="M14.1,14.1L12,24l-2.1-9.9L0,12l9.9-2.1L12,0l2.1,9.9L24,12L14.1,14.1z"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({ starStyles: [] }),
  created () {
    const numStars = 10
    const minSize = 10
    const maxSize = 80
    const minDuration = 10
    const maxDuration = 30
    for (let i = 0; i < numStars; i++) {
      let size = minSize + Math.random() * (maxSize - minSize)
      let top = Math.random() * window.innerHeight
      top += 'px'
      size += 'px'
      let animationDuration = minDuration + (Math.random() * (maxDuration - minDuration))
      animationDuration += 's'
      let animationDelay = Math.random() * maxDuration
      animationDelay += 's'
      this.starStyles.push({
        position: 'absolute',
        animationDuration,
        animationDelay,
        width: size,
        height: size,
        top
      })
    }
  }
}
</script>

<style scoped>
.stars-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.stars {
  position: relative;
  width: 100%;
  height: 100%;
}
.stars svg {
  left: -80px;
  animation: slide-right 5s linear infinite;
}
@keyframes slide-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 80px));
  }
}
</style>

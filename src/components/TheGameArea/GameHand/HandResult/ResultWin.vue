<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 84.41">
    <path id="result-win-balloon" d="M266.93,107.8H33.07A3.08,3.08,0,0,0,30,110.87v65.06A3.08,3.08,0,0,0,33.07,179H142.14l7.62,13.21L157.39,179H266.93a3.08,3.08,0,0,0,3.07-3.07V110.87A3.08,3.08,0,0,0,266.93,107.8Z" transform="translate(-10 -107.8)" fill="currentColor" class="text-gold" />
    <g class="dollar-sign">
      <path d="M38.29,133.83a17.91,17.91,0,0,1,35.82,0" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M56.09,151.85a17.91,17.91,0,0,1,0-35.82" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M73.88,151.74a17.91,17.91,0,0,1-35.82,0" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M56.09,133.72a17.91,17.91,0,1,1,0,35.82" transform="translate(-10 -107.8)" opacity="0.5"/>
      <rect x="41.64" y="3.7" width="2.99" height="62.57" opacity="0.5"/>
      <rect x="47.54" y="3.7" width="2.99" height="62.57" opacity="0.5"/>
    </g>
    <g class="dollar-sign">
      <path d="M226.12,133.83a17.91,17.91,0,0,1,35.82,0" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M243.91,151.85a17.91,17.91,0,0,1,0-35.82" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M261.71,151.74a17.91,17.91,0,0,1-35.82,0" transform="translate(-10 -107.8)" opacity="0.5"/>
      <path d="M243.91,133.72a17.91,17.91,0,0,1,0,35.82" transform="translate(-10 -107.8)" opacity="0.5"/>
      <rect x="229.47" y="3.7" width="2.99" height="62.57" opacity="0.5"/>
      <rect x="235.36" y="3.7" width="2.99" height="62.57" opacity="0.5"/>
    </g>
    <g id="result-win-text">
      <path d="M131.69,166.26h-2.8L115.2,125.68l-13.68,40.58h-2.8l-17-47.06h3.87l14.69,41.59L114,119.07h2.67l13.68,41.72L145,119.2h3.6Z" transform="translate(-10 -107.8)"/>
      <path d="M157.28,165.93V119.2h3.47v46.73Z" transform="translate(-10 -107.8)"/>
      <path d="M210.11,165.93,177.2,124.41v41.52h-3.34V119.2h3.27l32.24,40.65V119.2h3.34v46.73Z" transform="translate(-10 -107.8)"/>
    </g>
  </svg>
</template>

<style scoped>
.dollar-sign {
  animation: turn 2s ease;
  transform-origin: center;
  transform-box: fill-box;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
@keyframes turn {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(calc(6 * 360deg));
  }
}
</style>

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/variables.scss";'
      }
    }
  },
  configureWebpack: {
    output: {
      publicPath: '/vlackjack/'
    }
  }
}

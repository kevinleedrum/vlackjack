module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/variables.scss";'
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.output.publicPath = '/vlackjack/'
    }
  }
}

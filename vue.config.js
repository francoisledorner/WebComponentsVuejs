/*module.exports = {
    configureWebpack: {
      output: {
        libraryExport: 'default'
      }
    }
}
*/

const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './.' : '.',

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/std-grey.scss";@import "~@/styles/std-blue.scss";@import "~material-design-icons-iconfont/dist/material-design-icons.css";`
      },
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/std-grey.scss'), path.resolve(__dirname, './src/styles/std-blue.scss')]
    }
  }
}

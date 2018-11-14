const path = require('path');
const serviceEnv = require('./src/services/env');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('services', resolve('src/services'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('scss', resolve('src/scss'))
      .set('common', resolve('src/common'))
      .set('store', resolve('src/store'))
      .set('lib', resolve('src/lib'));

    config.resolve.set('extensions', ['.js', '.json']);
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      console.log('config :', config);
      // mutate config for production...
    } else {
      // mutate for development...
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: serviceEnv.proxy.base,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/', // rewrite path
        },
      },
      '/oauth': {
        target: serviceEnv.proxy.auth,
        secure: false,
        pathRewrite: {
          '^/oauth': '/oauth', // rewrite path
        },
      },
    },
  },
};

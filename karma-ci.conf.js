/* eslint-env node */

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    files: [
      'test/index.js',
      { pattern: 'test/specs/**' },
    ],
    exclude: [],
    preprocessors: {
      'test/**': ['webpack'],
    },
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.jsx?$/,
          exclude: /\/node_modules\//,
          loader: 'babel-loader',
        }],
      },
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
    },
    webpackMiddleware: {
      noInfo: true,
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
  })
}

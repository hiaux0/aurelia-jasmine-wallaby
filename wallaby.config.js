const { AureliaPlugin } = require('aurelia-webpack-plugin');
let wallabyWebpack = require('wallaby-webpack');
const webpackConfig = require('./webpack.config');
// require('aurelia-polyfills');

let wallabyPostprocessor = wallabyWebpack({
  // ...webpackConfig,
  entryPatterns: ['test/unit/setup.js', 'test/unit/**/*.spec.js'],
  plugins: [
    new AureliaPlugin({
      aureliaApp: undefined
    })
  ],
  node: {
    fs: 'empty'
  }
});

module.exports = function(wallaby) {
  return {
    files: [
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'test/stubs/**/*.js', load: false },
      { pattern: 'test/unit/setup.js', load: false }
    ],

    tests: [
      { pattern: 'test/unit/**/*.spec.js', load: false }
    ],

    env: {
      kind: 'electron'
      // type: 'node',
      // runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel({
        'presets': ['@babel/preset-env'],
        'plugins': [
          '@babel/plugin-transform-regenerator',
          ['@babel/plugin-proposal-decorators', { 'legacy': true }],
          '@babel/plugin-proposal-class-properties'

          // 'transform-async-generator-functions',
          // 'syntax-async-functions',
          // 'transform-decorators-legacy',
        ]
      })
    },

    postprocessor: wallabyPostprocessor,

    setup: function() {
      window.__moduleBundler.loadTests();
    }
  };
};

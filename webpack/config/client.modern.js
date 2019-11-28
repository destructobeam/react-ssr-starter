const path = require('path');
const WebpackChain = require('webpack-chain');

const COMMON = require('./common');

const ASSETS_PATH = path.resolve('public', 'assets');
const IS_DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = '/assets/';

const config = new WebpackChain();

config
  .merge(COMMON)
  .name('client.modern')

  .entry('client.modern')
  .add('./src/client.js')
  .end()

  .output.path(ASSETS_PATH)
  .publicPath(PUBLIC_PATH)
  .filename('[name].[hash].js');

config.module
  .rule('react')
  .test(/\.js$/)
  .exclude.add(/node_modules/)
  .end()
  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-modules', '@babel/preset-react'],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@loadable/babel-plugin',
      'babel-plugin-emotion',
    ],
  });

config
  .plugin('define')
  .use(require.resolve('webpack/lib/DefinePlugin'), [
    {
      IS_DEV,
      IS_BROWSER: true,
      IS_LEGACY: false,
      IS_MODERN: true,
      IS_SERVER: false,
    },
  ])
  .end()

  .plugin('loadable-stats')
  .use(require.resolve('@loadable/webpack-plugin'), [
    { filename: 'client-modern-stats.json', writeToDisk: true },
  ])
  .end()

  .plugin('webpack-bar')
  .use(require.resolve('webpackbar'), [
    { name: 'Client Modern', color: 'blue' },
  ])
  .end();

config.when(IS_DEV, config => {
  config
    .devtool('source-map')

    .plugin('hot-module')
    .use(require.resolve('webpack/lib/HotModuleReplacementPlugin'))
    .end();
});

module.exports = config.toConfig();

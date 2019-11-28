const path = require('path');
const WebpackChain = require('webpack-chain');

const COMMON = require('./common');

const ASSETS_PATH = path.resolve('public', 'assets');
const IS_DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = IS_DEV ? `http://localhost:3001/assets/` : '/assets/';

const config = new WebpackChain();

config
  .merge(COMMON)
  .name('client.modern')

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
      '@loadable/babel-plugin',
      // '@babel/plugin-syntax-dynamic-import',
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

config.when(
  IS_DEV,
  config => {
    const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
    const middleware = require('./middleware');

    config
      .entry('client.modern')
      // .add('webpack/hot/signal')
      .add('webpack-plugin-serve/client')
      .add('./src/client.js')
      .end()

      // .watch(true)
      .devtool('source-map')

      .plugin('serve')
      .use(Serve, [
        {
          port: 3001,
          allowMany: true,
          static: path.resolve('public'),
          middleware,
        },
      ])
      .end();

    // .plugin('hot-module')
    // .use(require.resolve('webpack/lib/HotModuleReplacementPlugin'))
    // .end();
  },
  config => {
    config
      .entry('client.modern')
      .add('./src/client.js')
      .end();
  }
);

module.exports = config.toConfig();

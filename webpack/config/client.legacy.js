const path = require('path');
const WebpackChain = require('webpack-chain');

const COMMON = require('./common');

const ASSETS_PATH = path.resolve('public', 'assets');
const IS_DEV = process.env.NODE_ENV !== 'production';
const PUBLIC_PATH = IS_DEV ? `http://localhost:3002/assets/` : '/assets/';

const config = new WebpackChain();

config
  .merge(COMMON)
  .name('client.legacy')

  .output.path(ASSETS_PATH)
  .publicPath(PUBLIC_PATH)
  .filename('[name].legacy.[hash].js');

config.module
  .rule('react')
  .test(/\.js$/)
  .exclude.add(/node_modules/)
  .end()

  .use('babel')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-env', '@babel/preset-react'],
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
      IS_BROWSER: true,
      IS_LEGACY: true,
      IS_MODERN: false,
      IS_SERVER: false,
    },
  ])
  .end()

  .plugin('loadable-stats')
  .use(require.resolve('@loadable/webpack-plugin'), [
    { filename: 'client-legacy-stats.json', writeToDisk: true },
  ])
  .end()

  .plugin('webpack-bar')
  .use(require.resolve('webpackbar'), [
    { name: 'Client Legacy', color: 'green' },
  ])
  .end();

config.when(
  IS_DEV,
  config => {
    const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
    const middleware = require('./middleware');

    config
      .entry('client')
      // .add('webpack/hot/signal')
      .add('webpack-plugin-serve/client')
      .add('./src/client.js')
      .end()

      // .entry('graphiql')
      // .add('src/graphiql')
      // .end()

      // .watch(true)
      .devtool('source-map')

      .plugin('serve')
      .use(Serve, [
        {
          port: 3002,
          allowMany: true,
          static: path.resolve('public'),
          middleware,
        },
      ]);

    // .plugin('hot')
    // .use(require.resolve('webpack/lib/HotModuleReplacementPlugin'))
    // .end();
  },

  config => {
    config
      .entry('client')
      .add('./src/client.js')
      .end();
  }
);

module.exports = config.toConfig();

const path = require('path');

const NodeExternals = require('webpack-node-externals');
const WebpackChain = require('webpack-chain');

const COMMON = require('./common');
const BUILD_PATH = path.resolve('build');
const IS_DEV = process.env.NODE_ENV !== 'production';

const config = new WebpackChain();

config
  .merge(COMMON)
  .name('server')
  .target('node')

  .devtool('source-map')

  .externals(
    NodeExternals({
      whitelist: ['webpack/hot/signal'],
    })
  )

  .output.path(BUILD_PATH)
  .filename('server.js')
  .end();

config.module
  .rule('react')
  .test(/\.js$/)
  .exclude.add(/node_modules/)
  .end()

  .use('babel')
  .loader('babel-loader')
  .options({
    presets: [
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
          targets: {
            node: true,
          },
        },
      ],
      '@babel/preset-react',
    ],

    plugins: [
      '@loadable/babel-plugin',
      '@babel/plugin-syntax-dynamic-import',
      'babel-plugin-emotion',
    ],
  });

config.module
  .rule('null-styled-components')
  .test(/styled\-components/)
  .use('null')
  .loader('null-loader');

config
  .plugin('define')
  .use(require.resolve('webpack/lib/DefinePlugin'), [
    {
      IS_DEV,
      IS_BROWSER: false,
      IS_LEGACY: false,
      IS_MODERN: true,
      IS_SERVER: true,

      PROTOCOL: JSON.stringify(process.env.PROTOCOL || 'http'),
      PORT: JSON.stringify(process.env.PORT || 3000),
    },
  ])
  .end()

  // .plugin('loadable-stats')
  // .use(require.resolve('@loadable/webpack-plugin'), [
  //   { filename: 'server-stats.json', writeToDisk: true },
  // ])
  // .end()

  .plugin('webpack-bar')
  .use(require.resolve('webpackbar'), [{ name: 'Server', color: 'yellow' }])
  .end();

config.when(
  IS_DEV,

  // Development Settings
  //
  config => {
    config
      .entry('server')
      .add('webpack/hot/signal')
      .add('./src/server.hot.js')
      .end()

      .watch(true)

      .plugin('hot-module')
      .use(require.resolve('webpack/lib/HotModuleReplacementPlugin'))

      .end()

      .plugin('start-server')
      .use(require.resolve('start-server-webpack-plugin'), [
        {
          name: 'server.js',
          nodeArgs: ['-r', 'source-map-support/register'],
          signal: true,
          keyboard: true,
        },
      ])
      .end();
  },

  // Production Settings
  //
  config => {
    config
      .entry('server')
      .add('./src/server.build.js')
      .end();

    config.optimization.minimize(false);
  }
);

module.exports = config.toConfig();

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const dev = process.env.NODE_ENV !== 'production';

const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const WebpackBar = require('webpackbar');

let config = {
  name: 'server',
  target: 'node',

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'server.js',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: true,
                  },
                  modules: 'commonjs',
                },
              ],
              '@babel/preset-react',
            ],

            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@loadable/babel-plugin',
            ],
          },
        },
      },
    ],
  },

  externals: [
    NodeExternals({
      whitelist: ['webpack/hot/signal'],
    }),
  ],

  plugins: [
    new DefinePlugin({
      'typeof window': JSON.stringify(null),
    }),
  ],
};

if (dev) {
  config = merge(config, {
    mode: 'development',

    entry: {
      server: ['webpack/hot/signal', './scripts/serve.js'],
    },

    watch: true,

    plugins: [
      new Dotenv(),
      new HotModuleReplacementPlugin(),
      new WebpackBar({ name: 'Server', color: 'blue' }),
      new StartServerPlugin({
        name: 'server.js',
        // nodeArgs: ['-r source-map-support/register'],
        signal: true,
        keyboard: true,
      }),
    ],
  });
} else {
  config = merge(config, {
    mode: 'production',

    entry: {
      server: './scripts/serve.js',
    },

    optimization: {
      minimize: false,
    },
  });
}

module.exports = config;

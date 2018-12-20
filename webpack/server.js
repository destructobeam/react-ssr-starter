const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const dev = process.env.NODE_ENV !== 'production';

const NodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const WebpackBar = require('webpackbar');

let config = {
  name: 'server',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '..', 'dist', 'server'),
    filename: 'server.js',
  },
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
            plugins: ['@babel/plugin-syntax-dynamic-import'],
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
};

if (dev) {
  config = merge(config, {
    entry: {
      server: ['webpack/hot/signal', './scripts/serve.js'],
    },
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    plugins: [
      new WebpackBar({ name: 'Server', color: 'blue' }),
      new webpack.HotModuleReplacementPlugin(),
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
  });
}

module.exports = config;

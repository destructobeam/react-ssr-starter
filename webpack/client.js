const path = require('path');
const merge = require('webpack-merge');

const dev = process.env.NODE_ENV !== 'production';

const CompressionPlugin = require('compression-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const LoadablePlugin = require('@loadable/webpack-plugin');
const SizePlugin = require('size-plugin');
const WebpackBar = require('webpackbar');

let config = {
  name: 'client',

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
                  targets: '> 0.25%, not dead',
                  modules: false,
                },
              ],
              '@babel/preset-react',
            ],

            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@loadable/babel-plugin',
              'babel-plugin-emotion',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new LoadablePlugin({
      writeToDisk: true,
    }),
    new SizePlugin(),
  ],
};

if (dev) {
  config = merge(config, {
    mode: 'development',

    entry: {
      main: ['webpack/hot/signal', './src/client.js'],
    },

    output: {
      path: path.resolve(__dirname, '..', 'public', 'assets'),
      publicPath: 'http://localhost:3001/assets/',
      filename: '[name].[hash].js',
    },

    devtool: 'source-map',
    devServer: {
      hot: true,
      headers: { 'Access-Control-Allow-Origin': '*' },
      contentBase: path.resolve('..', 'public', 'assets'),
      publicPath: 'http://localhost:3001/assets/',
      port: 3001,
      quiet: true,
    },

    plugins: [
      new HotModuleReplacementPlugin(),
      new WebpackBar({ name: 'Client', color: 'green' }),
    ],
  });
} else {
  config = merge(config, {
    mode: 'production',

    entry: {
      main: './src/client.js',
    },

    output: {
      path: path.resolve(__dirname, '..', 'public', 'assets'),
      publicPath: '/assets/',
      filename: '[name].[hash].js',
    },

    plugins: [new CompressionPlugin()],
  });
}

module.exports = config;

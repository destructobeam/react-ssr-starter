const path = require('path');
const merge = require('webpack-merge');

const dev = process.env.NODE_ENV !== 'production';

const webpack = require('webpack');
const Manifest = require('webpack-manifest-plugin');
const WebpackBar = require('webpackbar');

let config = {
  name: 'client',
  output: {
    path: path.resolve(__dirname, '..', 'public', 'assets'),
    publicPath: 'http://localhost:3001/assets/',
    filename: '[name].[hash].js',
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
                  targets: '> 0.25%, not dead',
                  modules: false,
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
};

if (dev) {
  config = merge(config, {
    mode: 'development',
    entry: {
      bundle: [
        'webpack/hot/poll?1000',
        './src/client.js',
      ]
    },
    devtool: 'source-map',
    devServer: {
      hot: true,
      headers:  {"Access-Control-Allow-Origin": "*"},
      publicPath: 'http://localhost:3001/assets/',
      port: 3001,
    },
    plugins: [
      new Manifest({
        publicPath: 'http://localhost:3001/assets/',
        writeToFileEmit: true,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new WebpackBar({ name: 'Client', color: 'green' }),
    ],
  });
} else {
  config = merge(config, {
    mode: 'production',
    entry: {
      bundle: './src/client.js',
    }
  });
}

module.exports = config;

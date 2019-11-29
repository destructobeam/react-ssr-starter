import Path from 'path';
import merge from 'webpack-merge';

import NodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import Webpack from 'webpack';
import WebpackBar from 'webpackbar';

const IS_DEV = process.env.NODE_ENV !== 'production';

let config = {
  name: 'server',
  target: 'node',

  output: {
    path: Path.resolve('..', 'build'),
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
              'babel-plugin-emotion',
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
    new Webpack.DefinePlugin({
      'typeof window': JSON.stringify(null),
    }),
  ],
};

if (IS_DEV) {
  config = merge(config, {
    mode: 'development',

    entry: {
      server: ['webpack/hot/signal', './scripts/serve.js'],
    },

    watch: true,

    plugins: [
      new Webpack.HotModuleReplacementPlugin(),
      new WebpackBar({ name: 'Server', color: 'purple' }),
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

export default config;

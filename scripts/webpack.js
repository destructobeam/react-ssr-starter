const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const dev = process.env.NODE_ENV !== 'production';

const clientConfig = require('../webpack/client');
const serverConfig = require('../webpack/server');

const logCompilerErrors = (error, stats) => {
  if (error) {
    console.error(error.stack || error);
    if (error.details) {
      console.error(error.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
};

if (dev) {
  const hotOptions = {
    contentBase: './public',
    publicPath: 'http://localhost:3001/',
    hot: true,
    host: 'localhost',
    port: 3001,
  };

  const devServerOptions = {
    ...clientConfig.devServer,
  };

  WebpackDevServer.addDevServerEntrypoints(clientConfig, hotOptions);

  const clientCompiler = webpack(clientConfig);
  const serverCompiler = webpack(serverConfig);

  const devServer = new WebpackDevServer(clientCompiler, devServerOptions);

  devServer.listen(devServerOptions.port, '127.0.0.1', () => {
    console.log(`Starting server on http://localhost:${devServerOptions.port}`);
  });

  serverCompiler.watch({}, logCompilerErrors);
} else {
  webpack([clientConfig, serverConfig], logCompilerErrors);
}

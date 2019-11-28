const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const log_compiler_errors = require('./log_compiler_errors');
const client_legacy_config = require('./config/client.legacy');
const client_modern_config = require('./config/client.modern');

const BASE_PORT = process.env.PORT || 3000;
const BIND_ADDRESS = '0.0.0.0';
const MODERN_PORT = BASE_PORT + 1;
const LEGACY_PORT = BASE_PORT + 2;

const base_options = {
  contentBase: './public',
  hot: true,
  host: 'localhost',
  // quiet: true,
  writeToDisk: filename => filename.includes('.json'),
};

const modern_options = {
  ...base_options,
  publicPath: `http://localhost:${MODERN_PORT}/`,
  port: MODERN_PORT,
};

const legacy_options = {
  ...base_options,
  publicPath: `http://localhost:${LEGACY_PORT}/`,
  port: LEGACY_PORT,
};

// .devServer.hot(true)
// .contentBase(ASSETS_PATH)
// .headers({
//   'Access-Control-Allow-Origin': '*',
// })
// .publicPath(PUBLIC_PATH)
// .port(PORT + 2)
// .quiet(true)
// .end()

// WebpackDevServer.addDevServerEntrypoints(client_modern_config, modern_options);
// WebpackDevServer.addDevServerEntrypoints(client_legacy_config, legacy_options);

const client_modern_compiler = Webpack(
  client_modern_config
  // log_compiler_errors
);

const client_legacy_compiler = Webpack(
  client_legacy_config
  // log_compiler_errors
);

client_modern_compiler.watch({}, log_compiler_errors);
client_legacy_compiler.watch({}, log_compiler_errors);

// const modern_dev_server = new WebpackDevServer(
//   client_modern_compiler,
//   modern_options
// );
// const legacy_dev_server = new WebpackDevServer(
//   client_legacy_compiler,
//   legacy_options
// );

// modern_dev_server.listen(modern_options.port, BIND_ADDRESS, () => {
//   console.log(
//     `Starting server on http://${BIND_ADDRESS}:${modern_options.port}`
//   );
// });

// legacy_dev_server.listen(legacy_options.port, BIND_ADDRESS, () => {
//   console.log(
//     `Starting server on http://${BIND_ADDRESS}:${legacy_options.port}`
//   );
// });

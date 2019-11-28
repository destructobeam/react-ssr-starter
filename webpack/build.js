const webpack = require('webpack');
const log_compiler_errors = require('./log_compiler_errors.js');
const client_legacy_config = require('./config/client.legacy.js');
const client_modern_config = require('./config/client.modern.js');
const server_config = require('./config/server.js');

webpack(
  [client_legacy_config, client_modern_config, server_config],
  log_compiler_errors
);

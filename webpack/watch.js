const Webpack = require('webpack');

const log_compiler_errors = require('./log_compiler_errors');

// const client_modern_config = require('./config/client.modern');
// const client_legacy_config = require('./config/client.legacy');
const server_config = require('./config/server.js');

const compiler = Webpack(server_config);

compiler.watch({}, log_compiler_errors);

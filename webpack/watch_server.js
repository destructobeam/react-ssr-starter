const Webpack = require('webpack');

const log_compiler_errors = require('./log_compiler_errors');
const server_config = require('./config/server.js');

const server_compiler = Webpack(server_config);

server_compiler.watch({}, log_compiler_errors);

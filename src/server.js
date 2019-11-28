import { errorToObject } from 'utils';
import yaml from 'js-yaml';

import Koa from 'koa';
import KoaStatic from 'koa-static';

import bootstrap from './server/bootstrap';
import browserslist from './server/browserslist';
// import emotion from './server/emotion';
import errors from './server/errors';
import loadable from './server/loadable';
import prepass from './server/prepass';
import react from './server/react';
// import redirect from './server/redirect';
import render from './server/render';
import timer from './server/timer';

const server = new Koa();

server.context.logger = console;

// Use webpack-dev-server in dev mode, otherwise serve static assets normally
if (!IS_DEV) {
  server.use(KoaStatic('public'));
}

// Request timer
server.use(timer);

// Wrap next() in try block to render error messages
// server.use(errors);

// Load asset manifest in to state and watch changes to manifest in development
server.use(bootstrap);

// Browserslist
server.use(browserslist);

// Generate (and set as body) HTML response
server.use(render);

// Check router status code and redirect if needed
// server.use(redirect);

// Create React app string
server.use(react);

// Set up chunk extractor
server.use(loadable);

// Prepass React render
// server.use(prepass);

// Create stylesheets
// server.use(emotion);

// Handle errors
// Log errors
server.on('error', (error, errorContext) => {
  const objError = errorToObject(error);

  errorContext.logger.group('Server error:');

  errorContext.logger.error(yaml.safeDump(objError));

  errorContext.logger.groupEnd();
  errorContext.logger.groupEnd();
});

export default server;

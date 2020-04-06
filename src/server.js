import path from 'path';

import Koa from 'koa';
import KoaStatic from 'koa-static';

import bootstrap from './server/bootstrap';
import react from './server/react';
import redirect from './server/redirect';
import loadable from './server/loadable';
import render from './server/render';

const dev = process.env.NODE_ENV !== 'production';
const server = new Koa();

if (!dev) {
  // Use webpack-dev-server in dev mode, otherwise serve static assets normally
  server.use(KoaStatic(path.resolve('public')));
}

// Load asset manifest in to state and watch changes to manifest in development
server.use(bootstrap);

// Generate (and set as body) HTML response
server.use(render);

// Check status code and redirect if needed
server.use(redirect);

// Set up chunk extractor
server.use(loadable);

// Create React app string
server.use(react);

// Log errors
server.on('error', (error, context) => {
  console.error(`Server error: ${error}`);
  console.error(`Error context: ${context}`);
});

export default server;

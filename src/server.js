import path from 'path';

import Koa from 'koa';
import KoaStatic from 'koa-static';

import bootstrap from './server/bootstrap';
import react from './server/react';
import emotion from './server/emotion';
import helmet from './server/helmet';
import redirect from './server/redirect';
import loadable from './server/loadable';
import render from './server/render';

const dev = process.env.NODE_ENV !== 'production';
const server = new Koa();

if (!dev) {
  // Use webpack-dev-server in dev mode, otherwise serve static assets normally
  server.use(KoaStatic(path.resolve('..', 'public')));
}

// Load asset manifest in to state and watch changes to manifest in development
server.use(bootstrap);

// Set up chunk extractor
server.use(loadable);

// Check React Router status code and redirect if needed
server.use(redirect);

// Create React app string
server.use(react);

// Create stylesheets
server.use(emotion);

// Set up content for head
server.use(helmet);

// Generate (and set as body) HTML response
server.use(render);

// Log errors
server.on('error', (error, context) => {
  console.error(`Server error: ${error}`);
  console.error(`Error context: ${context}`);
});

export default server;

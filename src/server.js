import Koa from 'koa';
import KoaStatic from 'koa-static';

import bootstrap from './server/bootstrap';
import react from './server/react';
import status from './server/status';
import render from './server/render';

const dev = process.env.NODE_ENV !== 'production';
const server = new Koa();

if (!dev) {
  // Use webpack-dev-server in dev mode, otherwise serve static assets normally
  server.use(KoaStatic('public'));
}

// Load asset manifest in to state and watch changes to manifest in development
server.use(bootstrap);
// Create React app string
server.use(react);
// Check React Router status code and redirect if needed
server.use(status);
// Generate (and set as body) HTML response
server.use(render);

server.on('error', (error, context) => {
  console.log(`Server error: ${error}`);
  console.log(`Error context: ${context}`);
});

export default server;

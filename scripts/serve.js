import 'source-map-support/register';

import http from 'http';
import https from 'https';
import app from '../src/server';

const dev = process.env.NODE_ENV !== 'production';
const protocol = process.env.PROTOCOL || 'http';
const port = process.env.PORT || 3000;

let handler = app.callback();
let server;

if (protocol === 'https') {
  server = https.createServer(handler);
} else {
  server = http.createServer(handler);
}

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`Server started on port ${port}`);
});

if (module.hot) {
  console.log('Server HMR Enabled!');

  module.hot.accept('../src/server', async () => {
    console.log('Reloading Server');

    try {
      const newApp = await import('../src/server');
      const newHandler = newApp.default.callback();

      server.removeListener('request', handler);
      server.on('request', newHandler);

      handler = newHandler;
    } catch (error) {
      console.error(error);
    }
  });
}

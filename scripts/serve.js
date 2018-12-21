const http = require('http');
const https = require('https');

const app = require('../src/server').default;
const dev = process.env.NODE_ENV !== 'production';
const ssl = process.env.PROTOCOL || 'http';
const port = process.env.PORT || 3000;

let handler = app.callback();
let server;

if (ssl) {
  server = http.createServer(handler);
} else {
  server = https.createServer(handler);
}

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log('Server started on port ', port);
});

if (module.hot) {
  console.log('Server HMR Enabled!');

  module.hot.accept('../src/server', () => {
    console.log('Reloading Server');

    try {
      const newHandler = require('../src/server').default.callback();

      server.removeListener('request', handler);
      server.on('request', newHandler);

      handler = newHandler;
    } catch (error) {
      console.error(error);
    }
  });
}

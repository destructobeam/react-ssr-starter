const http = require('http');
const app = require('../src/server').default;

const port = process.env.PORT || 3000;

let handler = app.callback();
const server = http.createServer(handler);

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log('Server started');
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

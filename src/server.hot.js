import http from 'http';
import https from 'https';
import server from './server';

let handler = server.callback();
let server_instance;

if (PROTOCOL === 'https') {
  server_instance = https.createServer(handler);
} else {
  server_instance = http.createServer(handler);
}

server_instance.listen(PORT, error => {
  if (error) {
    console.log(error);

    return;
  }

  console.log(`Server started on port ${PORT}`);
});

if (module.hot) {
  console.log('Server HMR Enabled');

  module.hot.accept('./server', async () => {
    console.log('Reloading Server');

    try {
      const new_app = await import('./server');
      const new_handler = new_app.default.callback();

      server_instance.removeListener('request', handler);
      server_instance.on('request', new_handler);

      handler = new_handler;
    } catch (error) {
      console.error('Hot load error:', error);
    }
  });
} else {
  console.log('Server HMR not running');
}

const { fork } = require('child_process');

fork('./webpack/watch_clients.js');
fork('./webpack/watch_server.js');

import server from './server.js';

server.listen(PORT, error => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Server started on port ${PORT}`);
});

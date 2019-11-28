const bootstrap = async (context, next) => {
  context.logger.info('Bootstrap response for', context.url);

  if (context.url === '/favicon.ico') {
    context.logger.info('Requested favicon');

    context.status = 404;
    context.body = '';

    return;
  }

  await next();
};

export default bootstrap;

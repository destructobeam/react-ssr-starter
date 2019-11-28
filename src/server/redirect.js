const redirect = async (context, next) => {
  context.logger.info('Redirect down');

  context.state.router_context = {};

  await next();

  if (context.state.router_context.url) {
    context.status = 301;
    context.redirect(context.state.router_context.url);
  }

  context.logger.info('Redirect up');
};

export default redirect;

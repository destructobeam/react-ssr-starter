const redirect = async (context, next) => {
  console.log('Redirect down');

  if (context.originalUrl === '/favicon.ico') {
    context.status = 404;
    context.body = '';
  }

  context.state.reactRouterContext = {};

  await next();

  console.log('Redirect up', context.state.reactRouterContext);

  if (context.state.reactRouterContext.url) {
    context.redirect(context.state.reactRouterContext.url);
  }
};

export default redirect;

const redirect = async (context, next) => {
  console.log('Redirect down');

  if (context.originalUrl === '/favicon.ico') {
    context.status = 404;
    context.body = '';
  }

  await next();

  console.log('Redirect up', context.state.reactRouterContext);
};

export default redirect;

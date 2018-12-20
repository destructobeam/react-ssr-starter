const redirect = async (context, next) => {
  console.log('Redirect down');

  context.state.reactRouterContext = {};

  await next();

  const { reactRouterContext } = context.state;

  console.log('Redirect up', reactRouterContext);

  if (reactRouterContext.url) {
    context.redirect(reactRouterContext.url);
  }
};

export default redirect;

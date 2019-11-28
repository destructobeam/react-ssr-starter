const set_headers = async (context, next) => {
  await next();

  context.set('Access-Control-Allow-Origin', '*');
};

const middle = app => {
  app.use(set_headers);
};

module.exports = middle;

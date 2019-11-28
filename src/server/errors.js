import five_hundred_error from './templates/five_hundred_error';

const errors = async (context, next) => {
  try {
    await next();
  } catch (error) {
    context.logger.error('catching errors in middleware', error);

    context.status = error.status || 500;
    context.body = `
    <!doctype html>
    <html>
    <head>
      <title>Server Error ${context.status} - ${error.code}</title>
    </head>
    <body style="width: 100%;">
      ${five_hundred_error(error, context.status)}
    </body>
    </html>
    `;
  }
};

export default errors;

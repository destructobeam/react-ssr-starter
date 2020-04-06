const render = async (context, next) => {
  console.log('Render down');

  await next();

  console.log('Render up');

  const { chunk_extractor, helmet, react_string } = context.state;

  context.body = `
    <!doctype html>
    <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.base.toString()}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}

      ${chunk_extractor.getLinkTags()}
      ${chunk_extractor.getScriptTags()}
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      ${helmet.noscript.toString()}
      <div id="main" role="main">${react_string}</div>
    </body>
    </html>
  `;
};

export default render;

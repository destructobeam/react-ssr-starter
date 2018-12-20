const render = async (context, next) => {
  await next();

  console.log('Render up');

  const {
    state: {
      assetManifest,
      chunkExtractor,
      helmet: { bodyAttributes, htmlAttributes, link, meta, title },
      reactString,
    },
  } = context;

  context.body = `
    <!doctype html>
    <html ${htmlAttributes.toString()}>
    <head>
      <title>SSR Starter</title>
      ${title.toString()}
      ${meta.toString()}
      ${link.toString()}
    </head>
    <body ${bodyAttributes.toString()}>
      <div id="main" role="main">${reactString}</div>
      ${chunkExtractor.getScriptTags()}
    </body>
    </html>
  `;
};

export default render;

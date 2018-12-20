const render = async (context, next) => {
  console.log('Render called');

  context.body = `
    <html>
    <head>
      <title>SSR Starter</title>
    </head>
    <body>
      <div id="main" role="main">${context.state.reactString}</div>
      <script src="${context.state.assetManifest["bundle.js"]}"></script>
    </body>
    </html>
  `
};

export default render;

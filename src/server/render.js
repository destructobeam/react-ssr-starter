const render = async (context, next) => {
  await next();

  console.log('Render up');

  const apollo_data_exists = 'apollo_data' in context.state;
  const chunk_extractor_exists = 'chunk_extractor' in context.state;
  const helmet_exists = 'helmet' in context.state;
  const introspection_result_exists = 'introspection_result' in context.state;

  context.body = `
    <!doctype html>
    <html ${
      helmet_exists ? context.state.helmet.htmlAttributes.toString() : ''
    }>
    <head>
      ${
        helmet_exists
          ? `
        ${context.state.helmet.title.toString()}
        ${context.state.helmet.meta.toString()}
        ${context.state.helmet.link.toString()}
      `
          : ''
      }

      ${
        chunk_extractor_exists
          ? `
        ${context.state.chunk_extractor.getLinkTags()}
        ${context.state.chunk_extractor.getStyleTags()}
      `
          : ''
      }
    </head>
    <body ${
      helmet_exists ? context.state.helmet.bodyAttributes.toString() : ''
    }>
      <div id="main" role="main">${context.state.react_string}</div>

      ${
        chunk_extractor_exists
          ? context.state.chunk_extractor.getScriptTags()
          : ''
      }

    ${
      apollo_data_exists
        ? `
      <script>
        window.__APOLLO_STATE__ = ${JSON.stringify(
          context.state.apollo_data
        ).replace(/</g, '\\u003c')};
      </script>
    `
        : ''
    }

    ${
      introspection_result_exists
        ? `
      <script>
        window.__INTROSPECTION_RESULT__ = ${JSON.stringify(
          context.state.introspection_result
        ).replace(/</g, '\\u003c')};
      </script>
    `
        : ''
    }
    </body>
    </html>
  `;
};

export default render;

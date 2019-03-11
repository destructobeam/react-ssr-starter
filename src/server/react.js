import React from 'react';
import { StaticRouter as Router } from 'react-router';
import { ChunkExtractorManager } from '@loadable/server';
import { renderToString } from 'react-dom/server';

import App from '../app';

const react = async (context, next) => {
  console.log('React down');

  context.state.reactString = renderToString(
    <ChunkExtractorManager extractor={context.state.chunkExtractor}>
      <Router context={context.state.reactRouterContext} location={context.url}>
        <App />
      </Router>
    </ChunkExtractorManager>
  );

  await next();

  console.log('React up');
};

export default react;

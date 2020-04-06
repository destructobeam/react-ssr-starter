import React from 'react';
import { ChunkExtractorManager } from '@loadable/server';
import { HelmetProvider } from 'react-helmet-async';
import { renderToString } from 'react-dom/server';

import App from '../app';

const react = async (context, next) => {
  console.log('React down');

  context.state.react = (
    <ChunkExtractorManager extractor={context.state.chunk_extractor}>
      <HelmetProvider context={context.state}>
        <App />
      </HelmetProvider>
    </ChunkExtractorManager>
  );

  await next();

  context.state.react_string = renderToString(context.state.react);

  console.log('React up');
};

export default react;

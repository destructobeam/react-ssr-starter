import React from 'react';
import { ChunkExtractorManager } from '@loadable/server';
import { HelmetProvider } from 'react-helmet-async';
import { renderToStringAsync } from 'react-async-ssr';

import App from '../app';

const react = async (context, next) => {
  context.logger.info('Creating react context');

  context.state.react = (
    <ChunkExtractorManager extractor={context.state.chunk_extractor}>
      <HelmetProvider context={context.state}>
        <App />
      </HelmetProvider>
    </ChunkExtractorManager>
  );

  await next();

  context.logger.info('Rendering react string');

  context.state.react_string = await renderToStringAsync(context.state.react);
};

export default react;

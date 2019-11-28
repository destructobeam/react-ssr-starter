import React from 'react';
import { renderToString } from 'react-dom/server';
import { ChunkExtractorManager } from '@loadable/server';
import { HelmetProvider } from 'react-helmet-async';

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

  try {
    context.state.react_string = renderToString(context.state.react);
  } catch (error) {
    console.log('Error rendering react string');
    console.log(error);
  }

  context.logger.info('react string', context.state.react_string);
};

export default react;

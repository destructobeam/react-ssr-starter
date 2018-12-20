import fs from 'fs';
import path from 'path';
import { ChunkExtractor } from '@loadable/server';

const loadable = async (context, next) => {
  console.log('Loadable down');

  const statsFile = path.resolve('public', 'assets', 'loadable-stats.json');

  context.state.chunkExtractor = new ChunkExtractor({ statsFile });

  await next();

  console.log('Loadable up');
};

export default loadable;

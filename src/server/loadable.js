import path from 'path';
import { ChunkExtractor } from '@loadable/server';

const loadable = async (context, next) => {
  console.log('Loadable down');

  const stats_file = path.resolve('public', 'assets', 'loadable-stats.json');

  context.state.chunk_extractor = new ChunkExtractor({ statsFile: stats_file });

  await next();

  console.log('Loadable up');
};

export default loadable;

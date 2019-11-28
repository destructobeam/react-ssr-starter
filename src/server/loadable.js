import path from 'path';
import { ChunkExtractor } from '@loadable/server';

const modern_stats_file = path.resolve(
  'public',
  'assets',
  'client-modern-stats.json'
);
const legacy_stats_file = path.resolve(
  'public',
  'assets',
  'client-legacy-stats.json'
);

const loadable = async (context, next) => {
  context.logger.info('Loadable down');

  if (context.state.modern_browser) {
    context.state.chunk_extractor = new ChunkExtractor({
      statsFile: modern_stats_file,
      entrypoints: ['client.modern'],
    });
  } else {
    context.state.chunk_extractor = new ChunkExtractor({
      statsFile: legacy_stats_file,
      entrypoints: ['client.legacy'],
    });
  }

  await next();

  context.logger.info('Loadable up');
};

export default loadable;

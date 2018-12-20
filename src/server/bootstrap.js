import fs from 'fs';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';

const bootstrap = async (context, next) => {
  console.log('Bootstrap down');

  context.state.assetManifest = require('../../public/assets/manifest.json');

  if (dev) {
    fs.watch('public/assets/manifest.json', (eventType, filename) => {
      if (eventType === 'change') {
        const manifestFile = fs.readFile('public/assets/manifest.json');

        try {
          context.state.assetManifest = JSON.parse(manifestFile);
        } catch (error) {
          console.log('Error updating manifest: ', error);
        }
      }
    });
  }

  await next();

  console.log('Bootstrap up');
};

export default bootstrap;

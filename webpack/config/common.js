const fs = require('fs');
const path = require('path');

const IS_DEV = process.env.NODE_ENV !== 'production';

const source_path = path.resolve(__dirname, '..', '..', 'src');
const contents = fs.readdirSync(source_path, { withFileTypes: true });
const directories = contents
  .filter(file => file.isDirectory())
  .map(dir => [dir.name, path.resolve(source_path, dir.name)])
  .reduce((acc, [name, path]) => ((acc[name] = path), acc), {});

module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  resolve: {
    alias: {
      ...directories,
    },
  },
};

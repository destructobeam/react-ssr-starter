import fs from 'fs';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';

const bootstrap = async (context, next) => {
  console.log('Bootstrap down');

  await next();

  console.log('Bootstrap up');
};

export default bootstrap;

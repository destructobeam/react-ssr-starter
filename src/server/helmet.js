import { Helmet } from 'react-helmet';

const helmet = async (context, next) => {
  console.log('Helmet down');

  context.state.helmet = Helmet.renderStatic();

  await next();

  console.log('Helmet up');
};

export default helmet;

import ssrPrepass from 'react-ssr-prepass';

const prepass = async (context, next) => {
  context.logger.info('Prepass down');

  await ssrPrepass(context.state.react);
  await next();

  context.logger.info('Prepass up');
};

export default prepass;

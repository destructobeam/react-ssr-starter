import ssrPrepass from 'react-ssr-prepass';

const prepass = async (context, next) => {
  context.logger.info('Prepass down');

  const result = await ssrPrepass(context.state.react, (element, instance) => {
    context.logger.info('SSR element', element);
    context.logger.info('SSR instance', instance);
  });

  console.log('Prepass result', result);

  await next();

  context.logger.info('Prepass up');
};

export default prepass;

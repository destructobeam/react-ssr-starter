import { renderStylesToString } from 'emotion-server';

const emotion = async (context, next) => {
  context.logger.info('Emotion down');

  context.state.reactString = renderStylesToString(context.state.reactString);

  await next();

  context.logger.info('Emotion up');
};

export default emotion;

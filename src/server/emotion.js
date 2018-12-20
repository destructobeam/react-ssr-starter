import { renderStylesToString } from 'emotion-server';

const emotion = async (context, next) => {
  console.log('Emotion down');

  context.state.reactString = renderStylesToString(context.state.reactString);

  await next();

  console.log('Emotion up');
};

export default emotion;

import uuidv4 from 'uuid/v4';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';

const timer = async (context, next) => {
  context.state.request_id = uuidv4();
  context.logger.group(`Request ${context.state.request_id}`);

  context.state.requestStart = Date.now();

  await next();

  context.logger.info(
    'Response time:',
    context.state.request_id,
    differenceInMilliseconds(Date.now(), context.state.requestStart)
  );

  context.logger.groupEnd();
};

export default timer;

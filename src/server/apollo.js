import { introspectSchema } from './apollo/introspect_schema';
import { createClient, createFragmentMatcher } from 'graph';

let introspection_result;
let fragment_matcher;

const apollo = async (context, next) => {
  context.logger.info('Creating Apollo context');

  if (!introspection_result || IS_DEV) {
    context.logger.info('Introspecting schema');
    introspection_result = await introspectSchema();
  }

  if (!fragment_matcher || IS_DEV) {
    context.logger.info('creating fragment_matcher');
    fragment_matcher = createFragmentMatcher(introspection_result);
  }

  context.state.introspection_result = introspection_result;
  context.state.apollo_client = createClient({
    fragmentMatcher: fragment_matcher,
  });

  await next();

  context.logger.info('Finalizing Apollo context');

  context.state.apollo_data = context.state.apollo_client.extract();
};

export default apollo;

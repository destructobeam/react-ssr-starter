import { matchesUA } from 'browserslist-useragent';

const MODERN_BROWSERS = [
  'Edge >= 16',
  'Firefox >= 60',
  'Chrome >= 61',
  'Safari >= 11',
  'Opera >= 48',
];

const OPTIONS = {
  browsers: MODERN_BROWSERS,
  allowHigherVersions: true,
};

const browserslist = async (context, next) => {
  context.logger.info('Browserslist up for', context.headers['user-agent']);

  context.state.modern_browser = matchesUA(
    context.headers['user-agent'],
    OPTIONS
  );

  await next();
};

export default browserslist;

export { Suspense } from './lazy';
export { lazy } from '@loadable/component';

export const noop = () => {};

export const errorToObject = ({
  columnNumber = '',
  fileName = '',
  lineNumber = '',
  message = '',
  name = '',
  stack = [],
}) => ({
  name,
  message,
  fileName,
  lineNumber,
  columnNumber,
  stack,
});

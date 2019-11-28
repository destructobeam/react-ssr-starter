export { lazy, Suspense } from './lazy';

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

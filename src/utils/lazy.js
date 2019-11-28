import { createElement, Fragment, Suspense as ReactSuspense } from 'react';

export const Suspense = ({ fallback, children }) =>
  IS_SERVER
    ? createElement(Fragment, {}, children)
    : createElement(ReactSuspense, { fallback }, children);

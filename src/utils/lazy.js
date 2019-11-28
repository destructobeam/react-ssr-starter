import { createElement, Fragment, Suspense as ReactSuspense } from 'react';
import { lazy as loadableLazy } from '@loadable/component';

export const lazy = func => {
  console.log('return lazy function', func());

  if (IS_SERVER) {
    console.log('server lazy function');

    throw func();
  } else {
    console.log('client lazy function');

    return loadableLazy(func);
  }
};

export const Suspense = ({ fallback, children }) =>
  IS_SERVER
    ? createElement(Fragment, {}, children)
    : createElement(ReactSuspense, { fallback }, children);

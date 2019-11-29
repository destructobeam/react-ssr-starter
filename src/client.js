// Concurrent mode server hydrate example:
// https://codesandbox.io/embed/floral-worker-xwbwv?codemirror=1

import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from './app';

const Client = () => (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

loadableReady(() => {
  hydrate(<Client />, document.getElementById('main'));
});

if (module.hot) {
  module.hot.accept();
}

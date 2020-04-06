import React from 'react';
import { loadableReady } from '@loadable/component';
import { HelmetProvider } from 'react-helmet-async';
import { hydrate } from 'react-dom';

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

import React from 'react';
import { createRoot } from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from './app';

loadableReady(() => {
  createRoot(document.getElementById('main')).hydrate(<App />);
});

if (module.hot) {
  module.hot.accept();
}

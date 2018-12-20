import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { hydrate } from 'react-dom';

import App from './app';

const Client = () => (
  <Router>
    <App />
  </Router>
);

loadableReady(() => {
  hydrate(<App />, document.getElementById('main'));
})

if (module.hot) {
  module.hot.accept();
}

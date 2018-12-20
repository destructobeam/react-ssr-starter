import React from 'react';
import { hydrate } from 'react-dom';

import App from './app';

const Client = () => <App />;

hydrate(<Client />, document.getElementById('main'));

if (module.hot) {
  module.hot.accept();
}

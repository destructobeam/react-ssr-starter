import React from 'react';
import { StaticRouter as Router } from 'react-router';
import { renderToString } from 'react-dom/server';

import App from '../app';

const react = async (context, next) => {
  console.log('react called');

  context.state.reactString = renderToString(<App />);

  await next();
};

export default react;

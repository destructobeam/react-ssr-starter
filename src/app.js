import React from 'react';
import { Helmet } from 'react-helmet-async';
import loadable from '@loadable/component';

const AsyncText = loadable(() => import('components/async'));

const App = () => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />
      <title>React SSR Starter</title>
    </Helmet>

    <h1>React SSR Starter</h1>

    <AsyncText />
  </>
);

export default App;

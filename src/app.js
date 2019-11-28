import React from 'react';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'utils';

const Text = lazy(() => import('components/text'));

const App = () => (
  <>
    <Helmet>
      <html lang="en" />
      <meta charSet="utf-8" />

      <title>React SSR Starter</title>
    </Helmet>

    <Suspense fallback={<h1>Loading</h1>}>
      <h1>React SSR Starter</h1>

      <Text>Some text</Text>
    </Suspense>
  </>
);

export default App;

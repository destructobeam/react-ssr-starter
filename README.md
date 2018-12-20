# React SSR Starter

Very barebones starter kit for server rendering React applications, probably
could be easily used for any other JavaScript framework that can render to
string.

Includes Webpack hot reloading for server and client apps.

## Client

- React
- React Router
- React Helmet

## Server

Uses the beautiful nature of Koa's async function middleware to encapsulate the
series of steps required to render your application on the server.

## TODO

- Figure out and implement client only code splitting for when you need super fast TTI, and don't care about overly complex auxiliary interfaces being rendered on the server and included in the initially loaded bundle.
- Possibly use streaming response on server
- Production settings

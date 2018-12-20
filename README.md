# React SSR Starter

Very barebones starter kit for server rendering React applications, probably
could be easily used for any other JavaScript framework that can render to
string.

## Client

- React
- React Router
- React Helmet

## Server

Uses the beautiful nature of Koa's async function middleware to encapsulate the
series of steps required to render your application on the server.

## TODO

- Add React Router middleware
- Check React Router's status code and apply to Koa
- Add in Emotion CSS-in-JS
- Code splitting with loadable-components
- Figure out and implement client only code splitting for when you need super fast TTI, and don't care about overly complex auxiliary interfaces being rendered on the server and included in the initially loaded bundle.

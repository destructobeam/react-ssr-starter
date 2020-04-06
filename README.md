# React SSR Starter

Very barebones starter kit for server rendering React applications, probably
could be easily used for any other JavaScript framework that can render to
string.

Includes Webpack hot reloading for server and client apps.

## Client

- React
- React Helmet Async

## Server

Uses the wonderful nature of Koa's async function middleware to encapsulate the
series of steps required to render your application on the server.

## Notes

### Prefetching

If you want route based prefetching, After.js seems like a good option.

GraphQL should be fetched on server by something like ApolloClient.

## TODO

- External asset webpack plugins
- Figure out and implement client only code splitting for when you need super fast TTI, and don't care about overly complex auxiliary interfaces being rendered on the server and included in the initially loaded bundle.
- Possibly use streaming response on server
- Testing setup
- Production settings

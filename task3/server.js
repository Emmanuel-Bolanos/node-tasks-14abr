const http = require('http');
const handler = require('./src/handlers');

const port = process.env.APP_PORT || 8080;

const myRouter = (path) => {
  const routes = {
    '/': handler.home,
    '/books': handler.books,
    '/file-viewer': handler.viewFiles,
    '/server-status': handler.serverStatus,
  };

  if (routes[path]) {
    return routes[path];
  }

  return handler.notFound;
};

const server = http.createServer((req, res) => {
  const myURL = req.url.split('?')[0];
  const route = myRouter(myURL);
  return route(req, res);
});

server.listen(port, () => console.log(`Listening at port ${port}`));

const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const { createRequestListener } = require('@react-router/node');

const buildServer = () => import('./build/server/index.js');
const listener = createRequestListener({
  build: buildServer,
  mode: process.env.NODE_ENV || 'production',
});

const publicDir = path.join(process.cwd(), 'build/client');

const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.txt', 'text/plain; charset=utf-8'],
]);

async function serveStaticFile(request, response) {
  const url = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);
  const filePath = path.join(publicDir, pathname);

  if (!filePath.startsWith(publicDir)) {
    return false;
  }

  try {
    const stat = await fs.stat(filePath);

    if (!stat.isFile()) {
      return false;
    }

    const contents = await fs.readFile(filePath);
    response.statusCode = 200;
    response.setHeader('Content-Type', mimeTypes.get(path.extname(filePath)) || 'application/octet-stream');
    response.end(contents);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);

  if (url.pathname === '/favicon.ico' || url.pathname.startsWith('/assets/')) {
    if (await serveStaticFile(request, response)) {
      return;
    }
  }

  listener(request, response);
});

const port = Number(process.env.PORT || 3000);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
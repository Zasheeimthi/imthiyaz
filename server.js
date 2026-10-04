const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.pdf': 'application/pdf',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let requestPath;
  try {
    requestPath = decodeURIComponent((req.url || '/').split('?')[0]);
  } catch {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Bad request');
    return;
  }
  const relative = requestPath === '/' ? '/index.html' : requestPath;
  const safeRelative = relative.replace(/^\/+/, '');
  const filePath = path.normalize(path.join(root, safeRelative));
  const publicFilePath = path.normalize(path.join(root, 'public', safeRelative));
  if (!filePath.startsWith(root) || !publicFilePath.startsWith(path.join(root, 'public'))) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  const sendFile = (targetPath, error, data) => {
    if (error) {
      res.writeHead(error.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(error.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }
    const type = mime[path.extname(filePath)] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
    res.end(data);
  };
  fs.readFile(filePath, (error, data) => {
    if (!error || error.code !== 'ENOENT') return sendFile(filePath, error, data);
    fs.readFile(publicFilePath, (publicError, publicData) => sendFile(publicFilePath, publicError, publicData));
  });
});

server.listen(port, '0.0.0.0', () => console.log(`Imthiyas portfolio listening on http://0.0.0.0:${port}`));

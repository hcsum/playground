const http = require('http');
const fs = require('fs');

const HTTP_PORT = 2001;

const server = http.createServer((req, res) => {
  console.info(req.method, req.url, req.headers, '\n\n');
  res.writeHead(400, {
    'Content-Type': 'application/json',
    'Cache-Control': 'max-age: 0, no-cache',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify({ body: 'shit happens' }));
});

function main() {
  server.listen(HTTP_PORT);
  console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

main();

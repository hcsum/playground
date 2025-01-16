const fs = require('fs');
const http = require('http');
const url = require('url');

// const fileData = fs.readFileSync('./response.txt', { encoding: 'utf-8' });

// var readStream = fileSystem.createReadStream(filePath);
// // We replaced all the event handlers with a simple call to readStream.pipe()
// readStream.on('open', function() {
//     // This just pipes the read stream to the response object (which goes to the client)
//     readStream.pipe(res);
// });

// readStream.on('error', function(err) {
//     res.end(err);
// });

const server = http.createServer((req, res) => {
  console.log(req.method, req.url, req.headers, '\n\n');
  if (req.method === 'GET') {
    if (/\/hello\b/.test(req.url)) {
      const delay = Math.random() * 2000;
      // const delay = 2000;
      const data = {
        delay,
        query: url.parse(req.url, true).query.query,
      };
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age: 0, no-cache',
      });
      setTimeout(() => res.end(JSON.stringify(data)), delay);
    } else {
      res.writeHead(400);
      res.end('wasup');
    }
  } else if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, {
        'XXX-XXX': 'custom',
      });
      res.end(JSON.parse(data));
    });
  }
});

const HTTP_PORT = 2001;

function main() {
  server.listen(HTTP_PORT);
  console.log(`Listening on http://localhost:${HTTP_PORT}...`);
}

main();

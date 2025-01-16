// https://www.youtube.com/watch?v=qG-PLm3APSs

process.env.UV_THREADPOOL_SIZE = 10;

// benchmarking performance
// bash:
// ab -n 1000 -c 100 "http://localhost:2000/" | grep "Requests"

// process.env.UV_THREADPOOL_SIZE = 1; // ~750
// process.env.UV_THREADPOOL_SIZE = 2; // ~1300
// process.env.UV_THREADPOOL_SIZE = 3; // ~1400
// process.env.UV_THREADPOOL_SIZE = 10; // ~1500

// each core in the computor responsible for one thread. So the increase of threadpool size, more cores will be allocated to execute the program. 
// but why performance keep increasing when threadpool size exceeds total core number? It is because some cores can do "hyper threading". 
// however, threadpool size bigger than physical core size can hurt performance because you lose time in context switching. Because the OS scheduler need to 
// let each thread to take turn to use a core. 

const http = require('http');
const bcrypt = require('bcrypt');

http.createServer((req, res) => {
  bcrypt.hash('coding forever', 2).then(hash => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write(hash);
    res.end();
  });
}).listen(2000);
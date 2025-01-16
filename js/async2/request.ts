const https = require('https');
const http = require('http');

export function request(hostname: string, path: string): Promise<Buffer> {
  const options = {
    hostname,
    port: 443,
    path,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {

      if (res.statusCode >= 400) {
        reject('fail to get ' + hostname + path + ' ' + res.statusMessage);
      }

      const data = []; 

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Buffer.concat(data));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

export function requestHttp(hostname: string, path: string, port: number): Promise<string> {
  const options = {
    hostname,
    port,
    path,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {

      if (res.statusCode >= 400) {
        reject(res.statusMessage);
      }

      const data = []; 

      res.on('data', (chunk) => {
        data.push(chunk);
      });

      res.on('end', () => {
        resolve(Buffer.concat(data).toString());
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}
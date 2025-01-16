const https = require('https');

function getDogWithCallback(cb) {
  const options = {
    hostname: 'dog.ceo',
    port: 443,
    path: '/api/breeds/image/random',
    method: 'GET',
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    const data = [];

    res.on('data', (chunk) => {
      data.push(chunk);
    });

    res.on('end', () => {
      cb(Buffer.concat(data).toString());
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
}

module.exports = getDogWithCallback;

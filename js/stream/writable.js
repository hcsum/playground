const fs = require('fs');
const w = fs.createWriteStream('cool.txt');
w.write('hi\n');
w.write('wow\n');
w.end();
w.on('finish', () => {
  console.log('finished!');
});
w.on('error', (err) => {
  console.log(err);
});
const fs = require('fs');

const folderPath = 'temp/'; 
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

for (let i = 0; i < 1000; i++) {
  const timestamp = Date.now();
  const filename = `${timestamp}_${(Math.random() * 10000).toFixed()}.json`;
  fs.writeFileSync(folderPath + filename, 'Hello world!');
}
const fs = require('fs');

// The file path and name
const filePath = '/Users/haochen/Downloads/attendee_list.csv';


// Create a writable stream in append mode
const writeStream = fs.createWriteStream(filePath, { flags: 'a' });

// Generate the content for each line
for (let i = 1; i <= 100; i++) {
  const line = `"haochen ${i}","haochen.xu+${i}@eventx.io","Manager","Example Organization","852","12345678","Hong Kong","China","no","cat"`;
  writeStream.write(line + '\n');
}

// Close the stream after writing
writeStream.end();

// Handle stream events
writeStream.on('finish', () => {
  console.log('Content has been appended to the file.');
});

writeStream.on('error', (err) => {
  console.error('Error appending to file:', err);
});





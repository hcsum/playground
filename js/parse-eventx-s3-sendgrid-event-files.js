const fs = require('fs');
const path = require('path');

function readFilesInFolder(folderPath) {
  const ids = [ '93b939eb-d0f3-494b-bc4f-8eaf3479a74f',
    '12f88259-13d4-4636-913a-c16e0caa0871',
    '6e06ab39-80f8-4e21-8e78-a876c5b9d0c4',
    'd4f0e795-86c9-47a0-8d02-044df97b47cf',
    'fa482739-302e-4806-8d08-dbb4a6d0fa27',
    'aac85fe4-80b6-4688-afd4-9570c0b0d5d0' ];
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      return;
    }

    files.forEach((file) => {
      console.log('reading file', file);
      const filePath = path.join(folderPath, file);
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const lines = data.split('\n');
        const matchedLines = lines.filter((line) => {
          try {
            const jsonData = JSON.parse(line);
            const attendeeId = jsonData.attendeeId;
            return ids.includes(attendeeId);
          } catch (error) {
            console.error('Error parsing line:', error);
            return false;
          }
        });

        const outputFileName = path.join('/Users/haochen/Desktop', 'matched_lines.txt');
        let outputData = matchedLines.join('\n');
        if (outputData) {
          outputData = 'file: ' + file + '\n' + outputData;
          fs.appendFile(outputFileName, outputData + '\n', 'utf-8', (err) => {
            if (err) {
              console.error('Error appending to file:', err);
              return;
            }
          });
        } 
      });
    });
  });
}


// Example usage:
const folderPath = '/Users/haochen/Downloads/s3-sendgrid/';
readFilesInFolder(folderPath);


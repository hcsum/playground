// https://itnext.io/using-node-js-to-read-really-really-large-files-pt-1-d2057fe76b33
const fs = require('fs');
const readline = require('readline');
const stream = require('stream');

const FILE = '/Users/sum_xu/Downloads/really-large-data/by_date/itcont_2018_20020411_20170529.txt';

const instream = fs.createReadStream(FILE);
const outstream = new stream();
const rl = readline.createInterface(instream, outstream);

let lineCount = 0;

rl.on('line', () => {
  lineCount++;
});

rl.on('close', () => {
  console.log('total lines: ',lineCount);
});
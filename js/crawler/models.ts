import { request } from '../async/request';
import { saveFile, makeDir, keepMakingDir } from '../async/saveFile';
import { bulkGetDataOnce, bulkGetDataInChunk } from '../async/asyncBulk';
import * as path from 'path';

const MAIN_DIR = path.resolve(__dirname, '/Users/sum/Pictures');

const [ , , ...args ] = process.argv;

console.log('args', args);

const picDir = MAIN_DIR + '/' + args[0];
const albumName = parseInt(args[1]);
const picTotal = parseInt(args[2]) || 1000;

keepMakingDir(picDir);
getAlbum(albumName, picTotal, picDir);

/**
 * arg1: filepath
 * arg2: album name
 * arg3: pic total
 */

// getAllAlbumsByModel([
//   '40726',
//   '40725',
//   '40710',
// ], '丝慕');

async function getAllAlbumsByModel(albums: string[], modelName: string) {
  const dirPath = MAIN_DIR + '/' + modelName;
  makeDir(dirPath);
  let alTotal = 0;

  for (const num of albums) {
    await getAlbum(parseInt(num), 100, dirPath)
      .catch(err => console.log('error occurred in getAlbum', num, err));
    alTotal++;
  }

  console.log('get ' + alTotal + ' albums done for ' + modelName);
}

function getAlbum(albumNum: number, totalPicNum: number, dirPath: string) {
  const albumPath = dirPath + '/' + albumNum;
  makeDir(albumPath);
  return bulkGetDataOnce(totalPicNum, (picNum) => getPicture(picNum, albumNum, albumPath), albumNum.toString());
}

function getPicture(picNum: number, albumNum: number, albumPath: string) {
  const picName = `${picNum}.jpg`;

  return Promise.race([
    request('tjg.hywly.com', `/a/1/${albumNum}/${picNum}.jpg`)
      .then((response) => {
        return saveFile(albumPath + '/' + picName, response);
      })
      .catch(err => {
        return err;
      }),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject('timeout downloading ' + picName);
      }, 5000);
    }),
  ]);
}
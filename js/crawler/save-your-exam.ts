import { bulkGetDataOnce, bulkGetDataInChunk } from '../async/asyncBulk';
import path from 'path';
import axios from 'axios';
import jsdom from 'jsdom';
import { makeDir } from '../async/saveFile';
import fs from 'fs';

const { JSDOM } = jsdom;

const url = 'https://www.savemyexams.com/gcse/maths/edexcel/22/topic-questions/1-number/number-toolkit/-/-/easy/';

// makeDir(fileDir);
scrap();

function scrap() {
  return axios.get(url).then(res => {
    const dom = new JSDOM(res.data);
    const string = dom.window.document.querySelector('script#__NEXT_DATA__').textContent;
    // log(data);
    // console.log('data', data);

    const data = JSON.parse(string);
    console.log('data', data.props.pageProps.pages.length); 
  });
}

function log(content) {
  fs.promises.appendFile('./logs/text', content);
}


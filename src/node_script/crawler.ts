const https = require('http');
const cheerio = require('cheerio');
import fetchInterImageHandler from '../utils/qiniuUpload.js';

async function readFileHandler(imgArr) {
  const arr :string[] = []
  for (let index of imgArr) {
    const res = await fetchInterImageHandler(imgArr[index]);
    console.log(res);
  }
} 
export default function crawlerArticle(url : string, callback) {
  https.get(url, (result) => {
    const imgArr :string[] = [];

    result.setEncoding('utf-8');
    let resChunk = '';
    result.on('data', (chunk) => {
      resChunk += chunk;
    });
    result.on('end', () => {
      const $ = cheerio.load(resChunk);
      $('#js_content').each((index, res) => {
        if (res.attribs['style']) {
          res.attribs.style = 'visibility: visible';
        }
      });

      $('img').each(function (index, res) {
        if (res.attribs['data-src']) {
          imgArr.push(res.attribs['data-src']);
        }
      });

      // readFileHandler(imgArr);

      
      // 写入文件
      callback($('#js_article').html());
    });
  });
}

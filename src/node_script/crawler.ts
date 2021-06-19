const http = require('http');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

export default function crawlerArticle(url : string, callback) {
  http.get(url, (result) => {
    result.setEncoding('utf-8');
    let resChunk = '';
    result.on('data', (chunk) => {
      resChunk += chunk;
    });
    result.on('end', () => {
      const $ = cheerio.load(resChunk);

      //   $('img').each((index, res) => {
      //     // 对img标签进行处理
      //     if (res.attribs['data-src']) {
      //       const src = res.attribs['data-src'];
      //       const srcArr = src.split('/');
      //       const fileType = srcArr[srcArr.length - 1].split('=')[1];
      //       const fileName = `${srcArr[srcArr.length - 2]}.${fileType}`;
      //       // 写入图片
      //       request(src).pipe(fs.createWriteStream(`./data/image/${fileName}`));
      //       // 把原路径改为本地路径
      //       res.attribs['data-src'] = `./images/${fileName}`;
      //       res.attribs.src = `./image/${fileName}`;
      //     }
      //   });
      //   $('link').each((index, res) => {
      //     // 对link标签进行处理
      //     if (res.attribs.href) {
      //       res.attribs.href = `https:${res.attribs.href}`;
      //     }
      //   });
      // 暂时还没想好怎么处理script
      // $('script').each((index, res) => {
      //
      // });
      // 写入文件
      callback($('#js_article').html());
    });
  });
}

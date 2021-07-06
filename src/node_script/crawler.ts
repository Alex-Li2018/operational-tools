const https = require('http');
const cheerio = require('cheerio');

function request(url) {
  return new Promise(function (reslove) {
    https.get(url, result => {
      result.setEncoding('utf-8');
      let resChunk = '';
      result.on('data', (chunk) => {
        resChunk += chunk;
      });
      result.on('end', () => {
        reslove(JSON.parse(resChunk));
      });
    });
  });
}

async function readFileHandler(imgArr) {
  const arr :string[] = []
  for (let key of imgArr) {
    const res: any = await request(`https://www.task-api.top/v1/fetch-url?url=${key}`);
    arr.push(`https://imgcdnstatic.top/${res.data.key}`)
  }
  return arr;
} 
export default function crawlerArticle(url : string) {
  return new Promise((resolve) => {
    https.get(url, (result) => {
      const imgArr :string[] = [];
      result.setEncoding('utf-8');
      let resChunk = '';
      result.on('data', (chunk) => {
        resChunk += chunk;
      });

      result.on('end', async () => {
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
  
        readFileHandler(imgArr).then((imgs: any) => {
          imgs.forEach((item, index) => {
            $('img').each(function (num, res) {
              index === num && (res.attribs['src'] = item);
            });
          });
          
          resolve($('#js_article').html());
        });
      });
    });
  });
}

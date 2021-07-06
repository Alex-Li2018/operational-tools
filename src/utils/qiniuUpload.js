const qiniu = require('qiniu');

// 抓取网络资源到空间
export default function fetchInterImageHandler(resUrl) {
    const accessKey = '9yc4Idc9w9NKCRslcArjoGtseVAQwHdawBcYEmtD';
    const secretKey = 'pBp9uStsfacCiIpHjLgouF1nEIxL-Ot6xd3OND-1';
    const bucket = 'ui-dooring';

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const config = new qiniu.conf.Config();
    config.useHttpsDomain = true;
    config.zone = qiniu.zone.Zone_z0;
    const bucketManager = new qiniu.rs.BucketManager(mac, config);

    const key = `image_${new Date().getTime()}${resUrl.split('.')[1]}`
    bucketManager.fetch(resUrl, bucket, key, function(err, respBody, respInfo) {
        return new Promise(function(resolve, reject) {
            if (err) {
               reject(err);
              } else {
                if (respInfo.statusCode == 200) {
                  resolve(respInfo);
                } else {
                  reject(respInfo)
                }
              }
        });
    });
}


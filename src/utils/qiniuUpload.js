import * as qiniu from 'qiniu-js';
import axios from 'axios';

export function getQiniuToken() {
    return new Promise((resolve, reject) => {
        axios('https://www.task-api.top/v1/qiniu-token').then(res => {
            resolve(res.data.data.uploadToken)
        }).catch(err => {
            reject(err);
        })
    });
}

export function uploadQiniu(file, key) {
    return new Promise((resolve, reject) => {
        getQiniuToken().then(token => {
            const observable = qiniu.upload(file, key, token);
            observable.subscribe({
                error(err){
                    reject(err);
                },
                complete(res){
                    resolve(res);
                }
            });
        }).catch(err => {
            reject(err);
        });
    });
}

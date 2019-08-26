/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 15:25:52
 * @LastEditTime: 2019-08-26 18:31:53
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 引入七牛SDK
const qiniu = require('qiniu');
// node上传处理模块
const formidable = require('formidable');
// fs
const fs = require('mz/fs');

// 日期插件
const moment = require('moment');

const config = {
  accessKey: 'LlMsm2IOaDRpITt3yZrb45VzjB4eQQZeJ99YTBIo',
  secretKey: '4oHMXZ3zCv-iA4y0ozYampBe_QRL5SKKQCga-JHR',
  bucket: 'webgo',
  url: 'http://7n.webgo.vip/',
};

// 要上传的空间
// const { bucket } = config; // 七牛云存储的存储空间名

const qn = {
  // 构建上传策略函数   （获取七牛上传token）
  uptoken: () => {
    const putPolicy = new qiniu.rs.PutPolicy({ scope: config.bucket });
    const accessKey = config.accessKey;
    const secretKey = config.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const uploadToken = putPolicy.uploadToken(mac);
    // console.log(uploadToken);
    return uploadToken;
  },
  // 七牛云的key

  key: () => {
    const key = new Date().getTime();
    return key;
  },

  uploader: (uploadToken, key, localFile) => {
    const formUploader = new qiniu.form_up.FormUploader();
    const putExtra = new qiniu.form_up.PutExtra();
    // console.log('开始上传');

    return new Promise((resolve, reject) => {
      // 文件上传
      formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
        respBody, respInfo) {
      // console.log('上传进来了');
        if (respErr) {
          console.log('上传失败');
          // throw respErr;
          reject(respErr);
        }
        if (respInfo.statusCode === 200) {
          console.log('上传成功');
          console.log(respBody);
          const { hash, key } = respBody;
          const result = {
            hash,
            img_url: config.url + key,
          };
          // 返回的数据
          resolve(result);
        } else {
          console.log('上传信息');
          console.log(respInfo.statusCode);
          // console.log(respBody);
          // resolve(respInfo.statusCode);
          resolve(respBody);

        }
      });
    });

    // // 文件上传
    // formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
    //   respBody, respInfo) {
    //   // console.log('上传进来了');
    //   if (respErr) {
    //     console.log('上传失败');
    //     throw respErr;
    //   }
    //   if (respInfo.statusCode === 200) {
    //     console.log('上传成功');

    //     console.log(respBody);
    //   } else {
    //     console.log('上传信息');

    //     console.log(respInfo.statusCode);
    //     console.log(respBody);
    //   }
    // });
  },
};

module.exports = qn;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:46:54
 * @LastEditTime: 2019-08-26 18:43:47
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 上传图片到七牛云
  router.post('/api/upload/qiniu_img', app.jwt, controller.qiniu.uploadImg);
  // 上传文件到本地服务器
  // router.post('/api/upload/file', app.jwt, controller.qiniu.uploadFile);
};

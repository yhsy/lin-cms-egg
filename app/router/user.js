/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:46:54
 * @LastEditTime: 2019-08-23 09:02:53
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录
  router.post('/api/admin/login', controller.admin.login);
  router.get('/api/admin/info', app.jwt, controller.admin.info);
  router.get('/api/admin/verify', controller.admin.verify);

  // router.get('/api/test/err', controller.test.err);
};

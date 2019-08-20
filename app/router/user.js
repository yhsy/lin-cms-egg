/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:46:54
 * @LastEditTime: 2019-08-20 09:44:27
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/info', app.jwt, controller.user.info);
  // router.get('/api/test/err', controller.test.err);
};

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:46:54
 * @LastEditTime: 2019-08-23 11:32:32
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 获取图形验证码
  router.get('/api/admin/verify', controller.admin.verify);
  // 登录
  router.post('/api/admin/login', controller.admin.login);
  // 获取个人信息
  router.get('/api/admin/info', app.jwt, controller.admin.info);
  // 获取管理员列表
  router.get('/api/admin/list', app.jwt, controller.admin.list);
};

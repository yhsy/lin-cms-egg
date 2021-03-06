/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:46:54
 * @LastEditTime: 2019-09-29 08:38:50
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
  // 添加管理员
  router.post('/api/admin/add', app.jwt, controller.admin.add);
  // 删除管理员
  router.post('/api/admin/delete', app.jwt, controller.admin.delete);
  // 编辑管理员
  router.post('/api/admin/edit', app.jwt, controller.admin.edit);
  // 修改密码
  router.post('/api/admin/change_password', app.jwt, controller.admin.changePassword);
  // 修改-状态
  router.post('/api/admin/edit/status', app.jwt, controller.admin.editStatus);
};

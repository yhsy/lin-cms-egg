/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 11:32:16
 * @LastEditTime: 2019-08-27 16:36:50
 * @LastEditors: Please set LastEditors
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 添加Banner
  router.post('/api/home/banner/add', app.jwt, controller.home.addBanner);
  // 编辑Banner
  router.post('/api/home/banner/edit', app.jwt, controller.home.editBanner);
  // 删除Banner(软删除)
  router.post('/api/home/banner/del', app.jwt, controller.home.delBanner);
};

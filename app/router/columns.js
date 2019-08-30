/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 12:19:37
 * @LastEditTime: 2019-08-30 18:35:10
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 添加栏目
  router.post('/api/columns/add', app.jwt, controller.columns.add);
  // 编辑栏目
  router.post('/api/columns/edit', app.jwt, controller.columns.edit);
  // 删除栏目(软)
  router.post('/api/columns/del', app.jwt, controller.columns.del);
  // 删除栏目(硬)
  router.post('/api/columns/remove', app.jwt, controller.columns.remove);

  // 获取栏目列表
  router.get('/api/columns/list', app.jwt, controller.columns.list);

};

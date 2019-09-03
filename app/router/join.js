/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:19:47
 * @LastEditTime: 2019-09-03 09:30:01
 * @LastEditors: Please set LastEditors
 */

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 添加加盟信息
  router.post('/api/join/add', app.jwt, controller.join.add);
  //   // 编辑加盟信息
  //   router.post('/api/join/edit', app.jwt, controller.join.edit);
  //   // 删除加盟信息(软)
  //   router.post('/api/join/del', app.jwt, controller.join.del);
  //   // 删除加盟信息(硬)
  //   router.post('/api/join/remove', app.jwt, controller.join.remove);

  //   // 获取加盟信息列表
  //   router.get('/api/join/list', app.jwt, controller.join.list);

};

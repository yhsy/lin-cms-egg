/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:35:22
 * @LastEditTime: 2019-08-29 10:25:21
 * @LastEditors: Please set LastEditors
 */


'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 测试index
  router.get('/api/article/index', controller.article.index);

  // 添加文章
  router.post('/api/article/add', app.jwt, controller.article.add);
  // 编辑文章
  router.post('/api/article/edit', app.jwt, controller.article.edit);
  // 删除文章(软)
  router.post('/api/article/del', app.jwt, controller.article.del);
  // 删除文章(硬)
  router.post('/api/article/remove', app.jwt, controller.article.remove);
};

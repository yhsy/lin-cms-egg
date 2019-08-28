/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:35:22
 * @LastEditTime: 2019-08-28 16:37:07
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
};

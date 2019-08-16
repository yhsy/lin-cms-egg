/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:42:08
 * @LastEditTime: 2019-08-16 09:53:22
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/test/index', controller.test.index);
  router.get('/api/test/info', controller.test.info);
  router.get('/api/test/err', controller.test.err);
};

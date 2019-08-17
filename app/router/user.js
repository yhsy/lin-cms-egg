'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 登录
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/info', controller.user.info);
  // router.get('/api/test/err', controller.test.err);
};

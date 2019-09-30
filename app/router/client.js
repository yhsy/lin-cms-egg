'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 获取banner
  router.get('/api/client/getbanner', controller.client.getBanner);
};

'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 获取banner
  router.get('/api/client/getbanner', controller.client.getBanner);
  // 获取首页-新闻
  router.get('/api/client/getnews', controller.client.getNews);
  // 新增加盟信息
  router.post('/api/client/addjoin', controller.client.addJoin);
};

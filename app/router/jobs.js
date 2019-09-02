
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 添加招聘信息
  router.post('/api/jobs/add', app.jwt, controller.jobs.add);
  // 编辑招聘信息
  router.post('/api/jobs/edit', app.jwt, controller.jobs.edit);
  // 删除招聘信息(软)
  router.post('/api/jobs/del', app.jwt, controller.jobs.del);
  // 删除招聘信息(硬)
  router.post('/api/jobs/remove', app.jwt, controller.jobs.remove);

  // 获取招聘信息列表
  router.get('/api/jobs/list', app.jwt, controller.jobs.list);

};

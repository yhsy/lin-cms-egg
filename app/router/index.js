/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:17:17
 * @LastEditTime: 2019-08-23 09:17:17
 * @LastEditors: Please set LastEditors
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);

  require('./test')(app);
  require('./admin')(app);
};

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:17:17
 * @LastEditTime: 2019-09-03 09:20:39
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
  require('./upload')(app);
  require('./home')(app);
  require('./article')(app);
  require('./columns')(app);
  require('./jobs')(app);
  require('./join')(app);

};

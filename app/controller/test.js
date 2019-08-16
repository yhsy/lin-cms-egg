/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:42:42
 * @LastEditTime: 2019-08-16 09:53:45
 * @LastEditors: Please set LastEditors
 */
'use strict';

const BaseController = require('./base');

const _ = require('lodash');

class TestController extends BaseController {
  async index() {
    const { app, ctx, service } = this;
    const query = ctx.request.query;
    console.log('env:%j', app.config.env);
    const cash = Number(query.cash);
    const uid = Number(query.uid);
    const res = 0;
    const period = 20190521;
    const data = {
      env: app.config.env,
    };

    // ctx.session.uids = { 111: { uid: 111 } };

    this.sendSuccess(data, 'ok');
  }

  async info() {
    const { app, ctx, service } = this;
    const query = ctx.request.query;
    console.log('env:%j', app.config.env);
    const cash = Number(query.cash);
    const uid = Number(query.uid);
    const res = 0;
    const period = 20190521;
    const data = {
      env: app.config.env,
    };

    // ctx.session.visited = 1;
    // console.log('session:%j', ctx.session);

    this.sendSuccess(data, 'ok');
  }

  async err() {
    const data = {};

    this.sendFail(data, '请求错误', 1001);
  }
}

module.exports = TestController;

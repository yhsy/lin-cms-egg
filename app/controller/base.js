/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:45:25
 * @LastEditTime: 2019-08-27 16:42:20
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  /*
   * return success
   * @params: object data
   * @params: string msg
   * @return: object { success, code, msg, data }
   */
  sendSuccess(data, msg) {
    const { ctx } = this;
    ctx.body = {
      success: true,
      code: 0,
      msg,
      data,
    };
    ctx.status = 200;
  }

  /*
   * return fail
   * @params: object data
   * @params: string msg
   * @return: object { success, code, msg, data }
   */
  sendFail(data, msg, code) {
    const { ctx } = this;
    ctx.body = {
      success: false,
      code,
      msg,
      data,
    };
    ctx.status = 200;
  }
  // 统一错误msg+日志
  sendErrmsg(msg) {
    const { ctx } = this;
    const { formatLoggerMsg } = this.ctx.helper;
    ctx.getLogger('formatLogger').info(formatLoggerMsg(msg));
    this.sendFail({}, msg, 10003);
  }
}

module.exports = BaseController;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 09:45:25
 * @LastEditTime: 2019-08-16 09:45:26
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
}

module.exports = BaseController;

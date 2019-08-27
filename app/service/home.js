/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:47:42
 * @LastEditTime: 2019-08-27 12:02:30
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 常用函数
const Utils = require('../utils');
const { filterNullObj } = Utils;

class HomeService extends Service {
  // 添加banner
  async addBanner() {
    const { ctx, app } = this;
    const requestObj = ctx.request.body;
    console.log(`requestObj is ${JSON.stringify(requestObj)}`);

    const results = await app.mysql.insert('lin_banner', requestObj);
    // 判断插入成功(判断是否插入成功 )
    const insertSuccess = results.affectedRows === 1;
    return insertSuccess;
  }
}

module.exports = HomeService;

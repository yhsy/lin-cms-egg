/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:47:42
 * @LastEditTime: 2019-08-27 16:35:04
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 常用函数
const Utils = require('../utils');
const { filterNullObj } = Utils;

class HomeService extends Service {
  // 查询banner信息
  async infoBanner(id) {
    const result = await this.app.mysql.get('lin_banner', { id });
    return result;
  }
  // 添加banner
  async addBanner() {
    const { ctx, app } = this;
    const requestObj = ctx.request.body;
    console.log(`requestObj is ${JSON.stringify(requestObj)}`);

    const result = await app.mysql.insert('lin_banner', requestObj);
    // 判断插入成功(判断是否插入成功 )
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  //  编辑banner
  async editBanner() {
    const requestObj = this.ctx.request.body;
    const result = await this.app.mysql.update('lin_banner', requestObj);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }
  // 删除banner
  async delBanner(id) {
    const row = {
      id,
      is_delete: 1,
    };
    const result = await this.app.mysql.update('lin_banner', row);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }
}

module.exports = HomeService;

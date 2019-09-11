/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:47:42
 * @LastEditTime: 2019-08-29 10:15:45
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 常用函数
const Utils = require('../utils');
const { formatTimeYMDH } = Utils;


class HomeService extends Service {
  // 查询banner信息
  async infoBanner (id) {
    const result = await this.app.mysql.get('lin_banner', { id });
    // 过滤软删除的id
    if (result.is_delete) {
      return false;
    }
    return result;
  }
  // 添加banner
  async addBanner () {
    const { ctx, app } = this;
    const requestObj = ctx.request.body;
    console.log(`requestObj is ${JSON.stringify(requestObj)}`);

    const result = await app.mysql.insert('lin_banner', requestObj);
    // 判断插入成功(判断是否插入成功 )
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }
  // 编辑banner
  async editBanner () {
    const requestObj = this.ctx.request.body;
    const result = await this.app.mysql.update('lin_banner', requestObj);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }
  // 删除banner(软删除)
  async delBanner (id) {
    const row = {
      id,
      is_delete: 1,
    };
    const result = await this.app.mysql.update('lin_banner', row);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }
  // 获取banner列表
  async listBanner (page) {
    const { ctx, app } = this;
    let results = {};
    const requestObj = ctx.request.query;
    const queryObj = {};

    // 过滤软删除的banner
    queryObj.is_delete = 0;
    // 查询条件(过滤前端提交的无用字段,只留下能查询的字段)
    if (requestObj.is_show) {
      queryObj.is_show = requestObj.is_show;
    }
    // 标题搜索
    if (requestObj.title) {
      queryObj.title = requestObj.title;
    }
    // 数据列表
    const list = await app.mysql.select('lin_banner', {
      where: queryObj,
      columns: ['id', 'sort', 'img_url', 'link', 'is_show', 'title', 'desc', 'create_time', 'update_time'],
      orders: [['sort', 'asc'], ['id', 'desc']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    // 判断该页是否有数据
    if (list.length === 0) {
      results = {
        list: [],
        total: 0,
      };
      return results;
    }

    // 数据总条数
    const total = await app.mysql.count('lin_banner', queryObj);
    results = {
      // 把日期格式化
      list: formatTimeYMDH(list),
      total,
    };
    return results;
  }
}

module.exports = HomeService;

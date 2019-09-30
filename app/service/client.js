'use strict';

const Service = require('egg').Service;
// 常用函数
const Utils = require('../utils');
const { formatTimeYMDH } = Utils;


class ClientService extends Service {
  // 客户端-获取banner(3条)
  async getBanner () {
    const { ctx, app } = this;

    // 数据列表
    const list = await app.mysql.select('lin_banner', {
      columns: ['id', 'sort', 'img_url', 'link', 'title', 'desc'],
      orders: [['sort', 'asc'], ['id', 'desc']],
      limit: 3,
      offset: 0,
    });

    // 格式化日期
    const results = formatTimeYMDH(list);
    return results;
  }
}

module.exports = ClientService;
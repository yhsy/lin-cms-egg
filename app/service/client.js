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
  // 客户端-获取新闻列表(4条)
  async getNews () {
    const { ctx } = this;
    const whereObj = {
      is_delete: 0,
    };

    // 文章列表(分页)
    const list = await ctx.model.Article.findAll({
      where: whereObj,
      // 返回过滤字段(浏览量和软删除)
      attributes: { exclude: ['pageviews', 'is_delete', 'status', 'updated_at'] },
      order: [
        // 创建时间-倒序
        ['created_at', 'DESC'],
        ['id', 'DESC'],
      ],
      // 条数
      limit: 4,
      offset: 0,
    });


    const results = formatTimeYMDH(list);

    return results;

  }
  // 客户端-新增加盟信息
  async addJoin () {
    const { ctx } = this;
    const { name, phone, address } = ctx.request.body;

    const requestObj = {
      name, phone, address,
    };

    const result = await ctx.model.Join.create(requestObj);
    return result;
  }
}

module.exports = ClientService;
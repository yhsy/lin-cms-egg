/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:28:02
 * @LastEditTime: 2019-08-29 10:16:35
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  // 添加文章
  async add() {
    const { ctx } = this;
    const requestObj = ctx.request.body;
    const result = await ctx.model.Article.create(requestObj);
    // console.log(`results is ${JSON.stringify(results)}`);
    return result;
  }
  // 获取文章详情
  async info(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.findOne({ where: { id } });
    return result;
  }
  // 编辑文章
  async edit(id) {
    const { ctx } = this;
    const requestObj = ctx.request.body;
    // 方法1
    // const result = await ctx.model.Article.save(requestObj,{ where: { id } });
    // 方法2
    const result = await ctx.model.Article.update(requestObj, { where: { id } });
    return result;
  }
  // 删除文章(软删除)
  async del(id) {
    const { ctx } = this;
    const requestObj = {
      is_delete: 1,
    };
    const result = await ctx.model.Article.update(requestObj, { where: { id } });
    return result;
  }
  // 删除文章(硬删除-数据库直接删除)
  async remove(id) {
    const { ctx } = this;
    const result = await ctx.model.Article.destroy({ where: { id } });
    return result;
  }
}

module.exports = ArticleService;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:28:02
 * @LastEditTime: 2019-08-28 20:16:16
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
  // 添加文章
  async add() {
    const { ctx } = this;
    const requestObj = ctx.request.body;
    const results = await ctx.model.Article.create(requestObj);
    // console.log(`results is ${JSON.stringify(results)}`);
    return results;
  }
}

module.exports = ArticleService;

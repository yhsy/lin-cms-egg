/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:30:17
 * @LastEditTime: 2019-08-28 20:04:28
 * @LastEditors: Please set LastEditors
 */

'use strict';

const BaseController = require('./base');
const ArticleRules = require('../rules/article');

class ArticleController extends BaseController {

  // 测试接口-egg-squlize插件
  async index() {
    const { ctx } = this;
    const results = await ctx.model.Article.findAll();
    ctx.body = results;
  }
  // 添加文章
  async add() {
    const { ctx, service } = this;

    // 校验必填项
    const { title, author, cover, url, content } = ctx.request.body;
    const rules = ArticleRules.add;
    const validateResult = await ctx.validate(rules, { title, author, cover, url, content });
    if (!validateResult) return;

    const result = await service.article.add();
    if (!result) {
      this.sendErrmsg('添加文章失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加文章成功');

  }
}

module.exports = ArticleController;

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:30:17
 * @LastEditTime: 2019-09-20 09:07:02
 * @LastEditors: Please set LastEditors
 */

'use strict';

const BaseController = require('./base');
const ArticleRules = require('../rules/article');

const Utils = require('../utils');
const { filterNullObj } = Utils;

class ArticleController extends BaseController {

  // 测试接口-egg-squlize插件
  async index () {
    const { ctx } = this;
    const results = await ctx.model.Article.findAll();
    ctx.body = results;
  }
  // 添加文章
  async add () {
    const { ctx, service } = this;

    // 校验必填项
    const { cid, title, author, cover, url, content } = ctx.request.body;
    const rules = ArticleRules.add;
    const validateResult = await ctx.validate(rules, { cid, title, author, cover, url, content });
    if (!validateResult) return;

    const result = await service.article.add();
    if (!result) {
      this.sendErrmsg('添加文章失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加文章成功');

  }

  // 编辑文章
  async edit () {
    const { ctx, service } = this;
    // const { id } = ctx.request.body;
    const { id, cid, title, author, cover, url, content, status, } = ctx.request.body;
    let rules = {}
    if (status >= 0) {
      rules = ArticleRules.editStatus;
      const validateResultsStatus = await ctx.validate(rules, {
        id,
        status,
      });
      if (!validateResultsStatus) return;
    } else {
      rules = ArticleRules.edit;
      const validateResults = await ctx.validate(rules, {
        id,
        cid,
        title,
        author,
        cover,
        url,
        content,
      });
      if (!validateResults) return;
    }




    const info = await service.article.info(id);
    if (!info) {
      this.sendErrmsg('文章ID不存在');
      return;
    }
    // console.log(`info is --- ${JSON.stringify(info)}`);

    const result = await service.article.edit(id);
    if (!result) {
      this.sendErrmsg('文章信息-修改失败,请重试');
      return;
    }
    this.sendSuccess({}, '文章信息-修改成功');

  }

  // 删除文章(软)
  async del () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = ArticleRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.article.info(id);
    if (!info) {
      this.sendErrmsg('文章ID不存在');
      return;
    }

    // 软删除
    const result = await service.article.del(id);

    if (!result) {
      this.sendErrmsg('文章-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '文章-删除成功');
  }
  // 删除文章(硬)
  async remove () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = ArticleRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.article.info(id);
    if (!info) {
      this.sendErrmsg('文章ID不存在');
      return;
    }

    // 硬删除需要管理员权限
    const uid = ctx.request.headers.id;
    const user = await service.admin.allInfo({ id: uid });
    if (!user) {
      this.sendErrmsg('管理员不存在');
      return;
    }

    if (user.admin !== 1) {
      this.sendErrmsg('对不起,您的权限不足');
      return;
    }

    // 硬删除
    const result = await service.article.remove(id);

    if (!result) {
      this.sendErrmsg('文章-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '文章-删除成功');
  }
  // 获取文章列表
  async list () {
    const { ctx, service } = this;

    const { page, limit } = ctx.request.query;

    const rules = ArticleRules.list;
    const validateResult = ctx.validate(rules, { page, limit });
    if (!validateResult) return;

    const results = await service.article.list();
    if (!results) {
      this.sendErrmsg('文章列表-获取失败,请重试');
      return;
    }
    this.sendSuccess(results, '文章列表-获取成功');
  }
}

module.exports = ArticleController;

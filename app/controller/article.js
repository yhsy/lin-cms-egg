/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:30:17
 * @LastEditTime: 2019-08-28 18:21:30
 * @LastEditors: Please set LastEditors
 */

'use strict';

const BaseController = require('./base');
const HomeRules = require('../rules/home');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticleController extends BaseController {

  // 测试接口-egg-squlize插件
  async index() {
    const { ctx } = this;
    const results = await ctx.model.Article.findAll();
    ctx.body = results;
  }
}

module.exports = ArticleController;

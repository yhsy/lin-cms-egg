/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:53:35
 * @LastEditTime: 2019-08-30 12:15:17
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;

const ArticleRules = require('../rules/article');
const Utils = require('../utils');
const { filterNullObj } = Utils;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const sCol = Sequelize.col;
// const sFn = Sequelize.fn;

const moment = require('moment');

class ColumnsService extends Service {
  // 添加栏目
  async add() {
    const { ctx } = this;
    const { cname } = ctx.request.body;
    // 找出最大的cid
    // const maxCid = ctx.model.Article.max('cid');
    const requestObj = {
      cname,
    };

    const result = await ctx.model.Columns.create(requestObj);
    return result;
  }

}

module.exports = ColumnsService;


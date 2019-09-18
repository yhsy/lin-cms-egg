/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:28:02
 * @LastEditTime: 2019-09-18 09:01:54
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;

const ArticleRules = require('../rules/article');
const Utils = require('../utils');
const { filterNullObj } = Utils;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require('moment');

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

  // 文章列表
  async list() {
    const { ctx } = this;
    const requestObj = ctx.request.query;
    const { page, limit, startTime, endTime } = ctx.request.query;
    // 过滤空数据
    const reqObj = filterNullObj(requestObj);
    // 注意:这里要把page和limit转成数字类型
    const Page = Number(page);
    const Limit = Number(limit);
    // console.log(`${JSON.stringify(reqObj)}`);
    const whereObj = {
      is_delete: 0,
    };
    let results = {};
    // 标题
    if (reqObj.title) {
      whereObj.title = {
        [Op.like]: `%${reqObj.title}%`,
      };
    }
    // 作者
    if (reqObj.author) {
      whereObj.author = {
        [Op.like]: `%${reqObj.author}%`,
      };
    }
    // 状态
    if (reqObj.status >= 0) {
      whereObj.status = reqObj.status;
    }
    // 浏览量
    // 创建时间
    if (startTime && endTime) {
      if (startTime === endTime) {
        // console.log('相等');
        whereObj.created_at = {
          // 大于等于
          [Op.gte]: startTime,
          // 小于
          [Op.lte]: moment(endTime).add(1, 'days'),
        };
      } else {
        whereObj.created_at = {
        // 大于等于
          [Op.gte]: startTime,
          // 小于
          [Op.lte]: endTime,
        };
      }

    }

    // 文章列表(分页)
    const list = await ctx.model.Article.findAll({
      where: whereObj,
      // 返回过滤字段(浏览量和软删除)
      attributes: { exclude: [ 'pageviews', 'is_delete' ] },
      order: [
        // 创建时间-倒序
        [ 'created_at', 'DESC' ],
        // [ 'id', 'DESC' ],
      ],
      // 条数
      limit: Limit,
      offset: (Page - 1) * Limit,
    });

    if (list.length === 0 || !list) {
      results = {
        list: [],
        total: 0,
      };
      return results;
    }

    // 统计总条数
    // findAndAll() 分页统计
    const total = await ctx.model.Article.count({
      where: whereObj,
    });

    results = {
      list,
      total,
    };

    return results;

  }
}

module.exports = ArticleService;

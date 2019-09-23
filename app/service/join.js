/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:13:12
 * @LastEditTime: 2019-09-23 08:44:02
 * @LastEditors: Please set LastEditors
 */

'use strict';

const Service = require('egg').Service;

const Utils = require('../utils');
const { filterNullObj } = Utils;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const moment = require('moment');

class JoinService extends Service {
  // 添加加盟信息
  async add() {
    const { ctx } = this;
    const { name, phone, address } = ctx.request.body;

    const requestObj = {
      name, phone, address,
    };

    const result = await ctx.model.Join.create(requestObj);
    return result;
  }
  // 获取加盟信息详情
  async info(id) {
    const { ctx } = this;
    const result = await ctx.model.Join.findOne({ where: { id } });
    return result;
  }
  // 编辑加盟信息
  async edit(id) {
    const { ctx } = this;
    const requestObj = ctx.request.body;
    const result = await ctx.model.Join.update(requestObj, { where: { id } });
    return result;
  }
  // 删除加盟信息(软删除)
  async del(id) {
    const { ctx } = this;
    const requestObj = {
      is_delete: 1,
    };
    const result = await ctx.model.Join.update(requestObj, { where: { id } });
    return result;
  }
  // 删除加盟信息(硬删除-数据库直接删除)
  async remove(id) {
    const { ctx } = this;
    const result = await ctx.model.Join.destroy({ where: { id } });
    return result;
  }

  // 加盟信息列表
  async list() {
    const { ctx } = this;

    const requestObj = ctx.request.query;
    const { page, limit, startTime, endTime } = ctx.request.query;

    // 过滤空数据
    const reqObj = filterNullObj(requestObj);
    const whereObj = {
      is_delete: 0,
    };
    let results = {};

    // 名称
    if (reqObj.name) {
      whereObj.name = {
        [Op.like]: `%${reqObj.name}%`,
      };
    }
    // 手机
    if (reqObj.phone) {
      whereObj.phone = {
        [Op.like]: `%${reqObj.phone}%`,
      };
    }
    // 地址
    if (reqObj.address) {
      whereObj.address = {
        [Op.like]: `%${reqObj.address}%`,
      };
    }
    // 状态
    if (reqObj.status >= 0) {
      whereObj.status = reqObj.status;
    }
    // 客户类型
    if (Number(reqObj.type) >= 0) {
      whereObj.type = reqObj.type;
    }

    // 创建时间
    if (startTime && endTime) {
      if (startTime === endTime) {
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

    // 加盟信息列表(分页)
    const list = await ctx.model.Join.findAll({
      where: whereObj,
      // 返回过滤字段(浏览量和软删除)
      attributes: { exclude: [ 'is_delete' ] },
      order: [
        // 创建时间-倒序
        [ 'created_at', 'DESC' ],
      ],
      // 条数
      limit: Number(limit),
      offset: (page - 1) * limit,
    });

    if (list.length === 0 || !list) {
      results = {
        list: [],
        total: 0,
      };
      return results;
    }

    // 统计总条数
    const total = await ctx.model.Join.count({
      where: whereObj,
    });

    results = {
      list,
      total,
    };

    return results;

  }

}

module.exports = JoinService;


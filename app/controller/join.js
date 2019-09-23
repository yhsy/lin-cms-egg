/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:17:23
 * @LastEditTime: 2019-09-23 08:44:34
 * @LastEditors: Please set LastEditors
 */

'use strict';

const BaseController = require('./base');
const JoinRules = require('../rules/join');

class JoinController extends BaseController {

  // 添加加盟
  async add () {
    const { ctx, service } = this;

    // 校验必填项
    const { name, phone, address } = ctx.request.body;

    const rules = JoinRules.add;
    const validateResult = await ctx.validate(rules, { name, phone, address });
    if (!validateResult) return;

    const result = await service.join.add();
    if (!result) {
      this.sendErrmsg('添加加盟失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加加盟成功');

  }

  // 编辑加盟
  async edit () {
    const { ctx, service } = this;

    const { id, name, phone, address, status, } = ctx.request.body;
    let rules = {}
    if (status >= 0) {
      rules = JoinRules.editStatus;
      const validateStatus = await ctx.validate(rules, {
        id, status,
      });
      if (!validateStatus) return;
    } else {
      rules = JoinRules.edit;
      const validateResults = await ctx.validate(rules, {
        id, name, phone, address,
      });
      if (!validateResults) return;
    }

    const info = await service.join.info(id);
    if (!info) {
      this.sendErrmsg('加盟ID不存在');
      return;
    }

    const result = await service.join.edit(id);
    if (!result) {
      this.sendErrmsg('加盟信息-修改失败,请重试');
      return;
    }
    this.sendSuccess({}, '加盟信息-修改成功');

  }

  // 删除加盟(软)
  async del () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = JoinRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.join.info(id);
    if (!info) {
      this.sendErrmsg('加盟ID不存在');
      return;
    }

    // 软删除
    const result = await service.join.del(id);

    if (!result) {
      this.sendErrmsg('加盟-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '加盟-删除成功');
  }
  // 删除加盟(硬)
  async remove () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = JoinRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.join.info(id);
    if (!info) {
      this.sendErrmsg('加盟ID不存在');
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
    const result = await service.join.remove(id);

    if (!result) {
      this.sendErrmsg('加盟-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '加盟-删除成功');
  }
  // 获取加盟列表
  async list () {
    const { ctx, service } = this;

    const { page, limit } = ctx.request.query;
    const rules = JoinRules.list;
    const validateResult = ctx.validate(rules, { page, limit });
    if (!validateResult) return;

    const results = await service.join.list();
    if (!results) {
      this.sendErrmsg('加盟列表-获取失败,请重试');
      return;
    }
    this.sendSuccess(results, '加盟列表-获取成功');
  }
}

module.exports = JoinController;

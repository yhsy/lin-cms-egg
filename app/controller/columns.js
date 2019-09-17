/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 12:15:44
 * @LastEditTime: 2019-09-17 08:55:24
 * @LastEditors: Please set LastEditors
 */
'use strict';

const BaseController = require('./base');
const ColumnsRules = require('../rules/columns');

// const Utils = require('../utils');
// const { filterNullObj } = Utils;

class ColumnsController extends BaseController {

  // 添加栏目
  async add() {
    const { ctx, service } = this;

    // 校验必填项
    const { type, cname, link } = ctx.request.body;

    const rules = ColumnsRules.add;
    const validateResult = await ctx.validate(rules, { type, cname, link });
    if (!validateResult) return;

    const result = await service.columns.add();
    if (!result) {
      this.sendErrmsg('添加栏目失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加栏目成功');

  }

  // 编辑栏目
  async edit() {
    const { ctx, service } = this;

    // const { cid, cname, status } = ctx.request.body;
    const { cid } = ctx.request.body;

    const rules = ColumnsRules.edit;
    const validateResults = await ctx.validate(rules, {
      // cid, cname, status,
      cid,
    });
    if (!validateResults) return;

    const info = await service.columns.info(cid);
    if (!info) {
      this.sendErrmsg('栏目ID不存在');
      return;
    }

    const result = await service.columns.edit(cid);
    if (!result) {
      this.sendErrmsg('栏目信息-修改失败,请重试');
      return;
    }
    this.sendSuccess({}, '栏目信息-修改成功');

  }

  // 删除栏目(软)
  async del() {
    const { ctx, service } = this;

    const { cid } = ctx.request.body;
    const rules = ColumnsRules.del;
    const validateResults = await ctx.validate(rules, {
      cid,
    });
    if (!validateResults) return;

    const info = await service.columns.info(cid);
    if (!info) {
      this.sendErrmsg('栏目ID不存在');
      return;
    }

    // 软删除
    const result = await service.columns.del(cid);

    if (!result) {
      this.sendErrmsg('栏目-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '栏目-删除成功');
  }
  // 删除栏目(硬)
  async remove() {
    const { ctx, service } = this;

    const { cid } = ctx.request.body;
    const rules = ColumnsRules.del;
    const validateResults = await ctx.validate(rules, {
      cid,
    });
    if (!validateResults) return;

    const info = await service.columns.info(cid);
    if (!info) {
      this.sendErrmsg('栏目ID不存在');
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
    const result = await service.columns.remove(id);

    if (!result) {
      this.sendErrmsg('栏目-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '栏目-删除成功');
  }
  // 获取栏目列表
  async list() {
    const { ctx, service } = this;

    const { page, limit } = ctx.request.body;
    const rules = ColumnsRules.list;
    const validateResult = ctx.validate(rules, { page, limit });
    if (!validateResult) return;

    const results = await service.columns.list();
    if (!results) {
      this.sendErrmsg('栏目列表-获取失败,请重试');
      return;
    }
    this.sendSuccess(results, '栏目列表-获取成功');
  }
}

module.exports = ColumnsController;

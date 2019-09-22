
'use strict';

const BaseController = require('./base');
const JobsRules = require('../rules/jobs');

class JobsController extends BaseController {

  // 添加招聘
  async add () {
    const { ctx, service } = this;

    // 校验必填项
    const { cid, title, num, content } = ctx.request.body;

    const rules = JobsRules.add;
    const validateResult = await ctx.validate(rules, { cid, title, num, content });
    if (!validateResult) return;

    const result = await service.jobs.add();
    if (!result) {
      this.sendErrmsg('添加招聘失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加招聘成功');

  }

  // 编辑招聘
  async edit () {
    const { ctx, service } = this;

    const { id, cid, title, num, content, status } = ctx.request.body;

    if (Number(status) >= 0) {
      // 修改招聘状态
      const ruleStatus = JobsRules.editStatus;
      const ruleResults = await ctx.validate(ruleStatus, {
        id, status,
      });
      if (!ruleResults) return;

    } else {
      const rules = JobsRules.edit;
      const validateResults = await ctx.validate(rules, {
        id, cid, title, num, content
      });
      if (!validateResults) return;
    }

    const info = await service.jobs.info(id);
    if (!info) {
      this.sendErrmsg('招聘ID不存在');
      return;
    }

    const result = await service.jobs.edit(id);
    if (!result) {
      this.sendErrmsg('招聘信息-修改失败,请重试');
      return;
    }
    this.sendSuccess({}, '招聘信息-修改成功');

  }

  // 删除招聘(软)
  async del () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = JobsRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.jobs.info(id);
    if (!info) {
      this.sendErrmsg('招聘ID不存在');
      return;
    }

    // 软删除
    const result = await service.jobs.del(id);

    if (!result) {
      this.sendErrmsg('招聘-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '招聘-删除成功');
  }
  // 删除招聘(硬)
  async remove () {
    const { ctx, service } = this;

    const { id } = ctx.request.body;
    const rules = JobsRules.del;
    const validateResults = await ctx.validate(rules, {
      id,
    });
    if (!validateResults) return;

    const info = await service.jobs.info(id);
    if (!info) {
      this.sendErrmsg('招聘ID不存在');
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
    const result = await service.jobs.remove(id);

    if (!result) {
      this.sendErrmsg('招聘-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '招聘-删除成功');
  }
  // 获取招聘列表
  async list () {
    const { ctx, service } = this;

    // const { page, limit } = ctx.request.body;
    const { page, limit } = ctx.request.query;

    const rules = JobsRules.list;
    const validateResult = ctx.validate(rules, { page, limit });
    if (!validateResult) return;

    const results = await service.jobs.list();
    if (!results) {
      this.sendErrmsg('招聘列表-获取失败,请重试');
      return;
    }
    this.sendSuccess(results, '招聘列表-获取成功');
  }
}

module.exports = JobsController;

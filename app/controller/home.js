/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:17:17
 * @LastEditTime: 2019-08-27 18:02:25
 * @LastEditors: Please set LastEditors
 */
'use strict';

const BaseController = require('./base');
const HomeRules = require('../rules/home');

class HomeController extends BaseController {

  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  // 添加banner
  async addBanner() {
    const { ctx, service } = this;
    const { sort, img_url, is_show } = ctx.request.body;

    // 校验规则
    const rules = HomeRules.addBanner;
    // 校验结果
    const validateResult = await ctx.validate(rules, {
      sort, img_url, is_show,
    });
    // 校验失败,返回错误信息
    if (!validateResult) return;

    // 插入到数据库
    const results = await service.home.addBanner();
    // 添加失败
    if (!results) {
      // 错误日志
      this.sendErrmsg('添加失败,请重试');
      return;
    }
    this.sendSuccess({}, '添加成功');
  }
  // 编辑banner
  async editBanner() {
    const { ctx, service } = this;
    const { id, sort, img_url, is_show } = ctx.request.body;

    const rules = HomeRules.editBanner;
    const validateResult = await ctx.validate(rules, { id, sort, img_url, is_show });
    if (!validateResult) return;

    const bannerInfo = await service.home.infoBanner(id);
    if (!bannerInfo) {
      this.sendErrmsg('ID不存在');
      return;
    }

    const results = await service.home.editBanner();
    if (!results) {
      this.sendErrmsg('添加失败,请重试');
      return;
    }

    this.sendSuccess({}, '修改成功');
  }
  // 删除Banner(软删除)
  async delBanner() {
    const { ctx, service } = this;
    const { id } = ctx.request.body;

    const rules = HomeRules.delBanner;
    const validateResult = await ctx.validate(rules, { id });
    if (!validateResult) return;

    const bannerInfo = await service.home.infoBanner(id);
    if (!bannerInfo) {
      this.sendErrmsg('ID不存在');
      return;
    }

    const results = await service.home.delBanner(id);
    if (!results) {
      this.sendErrmsg('删除失败,请重试');
      return;
    }

    this.sendSuccess({}, '删除成功');

  }
  // 获取Banner列表
  async listBanner() {
    const { ctx, service } = this;
    const { page } = ctx.request.body;

    const rules = HomeRules.list;
    const validateResult = await ctx.validate(rules, { page });
    if (!validateResult) return;

    const results = await service.home.listBanner(page);
    // 没有数据
    if (results.list.length === 0) {
      this.sendSuccess(results, '暂无数据');
      return;
    }

    this.sendSuccess(results, '列表获取成功');
  }
}

module.exports = HomeController;

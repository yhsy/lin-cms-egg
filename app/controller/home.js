/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 11:17:17
 * @LastEditTime: 2019-08-27 15:52:25
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
    const { formatLoggerMsg } = ctx.helper;
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
      ctx
        .getLogger('formatLogger')
        .info(formatLoggerMsg('添加失败,请重试', ''));
      this.sendFail({}, '添加失败,请重试', 10003);
      return;
    }
    this.sendSuccess({}, '添加成功');
  }
  // 编辑banner
  async editBanner() {
    const { ctx, service } = this;
    const { formatLoggerMsg } = ctx.helper;
    const { id, sort, img_url, is_show } = ctx.request.body;

    const rules = HomeRules.editBanner;
    const validateResult = await ctx.validate(rules, { id, sort, img_url, is_show });
    if (!validateResult) return;

    const bannerInfo = await service.home.infoBanner(id);
    if (!bannerInfo) {
      ctx.getLogger('formatLogger').info(formatLoggerMsg('ID不存在'));
      this.sendFail({}, 'ID不存在', 10003);
      return;
    }

    const results = await service.home.editBanner();
    if (!results) {
      ctx.getLogger('formatLogger').info(formatLoggerMsg('修改失败,请重试'));
      this.sendFail({}, '添加失败,请重试', 10003);
      return;
    }

    this.sendSuccess({}, '修改成功');
  }
}

module.exports = HomeController;


'use strict';

const BaseController = require('./base');
const JoinRules = require('../rules/join');

class ClientController extends BaseController {
  // 首页-获取banner
  async getBanner () {
    const { ctx, service } = this;
    const results = await service.client.getBanner();
    this.sendSuccess(results, '列表获取成功');
  }
  // 首页-获取新闻列表
  async getNews () {
    const { ctx, service } = this;
    // const results = [
    //   {
    //     title: '我是新闻标题1'
    //   },
    //   {
    //     title: '我是新闻标题2'
    //   },
    //   {
    //     title: '我是新闻标题3'
    //   }
    // ]
    const results = await service.client.getNews();
    this.sendSuccess(results, '列表获取成功');
  }

  // 添加加盟
  async addJoin () {
    const { ctx, service } = this;

    // 校验必填项
    const { name, phone, address } = ctx.request.body;

    const rules = JoinRules.add;
    const validateResult = await ctx.validate(rules, { name, phone, address });
    if (!validateResult) return;

    const result = await service.client.addJoin();
    if (!result) {
      this.sendErrmsg('留言失败,请重试');
      return;
    }
    this.sendSuccess({}, '恭喜您,留言成功');

  }
}

module.exports = ClientController;

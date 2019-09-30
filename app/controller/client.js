
'use strict';

const BaseController = require('./base');
const HomeRules = require('../rules/home');

class ClientController extends BaseController {
  // 首页-获取banner
  async getBanner () {
    const { ctx, service } = this;

    const results = await service.home.getBanner();
    // 没有数据
    if (results.list.length === 0) {
      this.sendSuccess(results, '暂无数据');
      return;
    }

    this.sendSuccess(results, '列表获取成功');
  }
}

module.exports = ClientController;

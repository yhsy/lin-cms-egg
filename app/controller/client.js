
'use strict';

const BaseController = require('./base');

class ClientController extends BaseController {
  // 首页-获取banner
  async getBanner () {
    const { ctx, service } = this;
    const results = await service.client.getBanner();
    this.sendSuccess(results, '列表获取成功');
  }
}

module.exports = ClientController;

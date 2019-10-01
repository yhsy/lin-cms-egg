
'use strict';

const BaseController = require('./base');

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
}

module.exports = ClientController;

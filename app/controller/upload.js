/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 14:43:37
 * @LastEditTime: 2019-08-26 18:42:48
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 基础控制类
const BaseController = require('./base');
const path = require('path');
// 七牛云上传
const qn = require('../utils/qiniu');

class UploadController extends BaseController {

  // 上传图片到七牛云
  async uploadImg() {
    const { ctx } = this;
    const { formatLoggerMsg } = this.ctx.helper;

    // 获取上传的文件
    const file = ctx.request.files[0];
    // 文件名(默认)
    const name = path.basename(file.filename);
    // 文件类型
    const type = name.split('.')[1];
    // 上传临时目录
    const filePath = file.filepath;
    // const fileName = Date.now() + '.png';
    // console.log(`name is ${name}`);
    // console.log(`type is ${type}`);
    // console.log(`filePath is ${filePath}`);

    // 获取七牛云-token
    const token = qn.uptoken();
    // 获取七牛云-key(上传后的文件名-自己生成)
    const key = qn.key() + '.' + type;
    // 上传图片
    const results = await qn.uploader(token, key, filePath);
    // console.log(`results is ${results}`);
    // 上传失败
    if (!results) {
      ctx.getLogger('formatLogger').info(formatLoggerMsg('图片上传失败'));
      this.sendFail({}, '上传失败,请重试', 10003);
      return;
    }
    // 上传成功返回
    this.sendSuccess(results, 'ok');

  }
}

module.exports = UploadController;


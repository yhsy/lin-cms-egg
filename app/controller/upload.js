/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 14:43:37
 * @LastEditTime: 2019-08-28 12:01:19
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 基础控制类
const BaseController = require('./base');
const path = require('path');
// 七牛云上传
const qn = require('../utils/qiniu');

const fs = require('mz/fs');
const pump = require('mz-modules/pump');


class UploadController extends BaseController {
  // 上传图片到七牛云
  async uploadImg() {
    const { ctx } = this;

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
      this.sendErrmsg('七牛云-上传失败,请重试');
      return;
    }
    // 上传成功返回
    this.sendSuccess(results, 'ok');

  }

  //   上传文件到服务器
  async uploadFile() {
    const { ctx } = this;

    const files = ctx.request.files;
    ctx.logger.warn('files: %j', files);

    try {
      for (const file of files) {
        // 文件名
        const filename = file.filename.toLowerCase();
        // 上传的目录
        const targetPath = path.join(this.config.baseDir, 'app/public', filename);
        const source = fs.createReadStream(file.filepath);
        const target = fs.createWriteStream(targetPath);
        await pump(source, target);
        ctx.logger.warn('save %s to %s', file.filepath, targetPath);
      }
    } finally {
      // delete those request tmp files
      await ctx.cleanupRequestFiles();
    }

    const fields = [];
    for (const k in ctx.request.body) {
      fields.push({
        key: k,
        value: ctx.request.body[k],
      });
    }

    // console.log(files, fields);

    // await ctx.render('page/multiple_result.html', {
    //   fields,
    //   files,
    // });
  }
}

module.exports = UploadController;


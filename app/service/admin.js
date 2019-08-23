/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:22:02
 * @LastEditTime: 2019-08-23 09:06:59
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 验证码插件
const svgCaptcha = require('svg-captcha');

class AdminService extends Service {
  // 生成验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      // 验证码长度
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      // 验证码图片背景颜色
      bacground: '#cc9966',
      // 验证码字符是否有颜色
      color: true,
      // 验证码字符中排除 0o1i
      ignoreChars: '0o1i',
    });
    // 验证码文字存到session里,随机生成的验证码
    this.ctx.session.code = captcha.text;
    return captcha;
  }
  // 获取管理员-全部信息
  async allInfo(obj) {
    // obj = {username: 'xxx'}
    const results = await this.app.mysql.get('lin_user', obj);
    return results;
  }
  // 获取基础信息
  async info(obj) {
    const results = await this.app.mysql.select('lin_user', { // 搜索 lin_user 表
      where: obj, // WHERE 条件
      columns: [ 'id', 'nickname', 'avatar' ], // 要查询的表字段(既返回的数据)
    });
    return results;
  }
}

module.exports = AdminService;

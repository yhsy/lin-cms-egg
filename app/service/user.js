/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:22:02
 * @LastEditTime: 2019-08-22 18:57:03
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 验证码插件
const svgCaptcha = require('svg-captcha');

class UserService extends Service {
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
}

module.exports = UserService;

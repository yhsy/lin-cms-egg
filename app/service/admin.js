/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:22:02
 * @LastEditTime: 2019-08-23 15:05:31
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 验证码插件
const svgCaptcha = require('svg-captcha');
// 日期插件
const moment = require('moment');

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
    const results = await this.app.mysql.get('lin_admin', obj);
    return results;
  }
  // 获取基础信息
  async info(obj) {
    const results = await this.app.mysql.select('lin_admin', { // 搜索 lin_admin 表
      where: obj, // WHERE 条件
      columns: [ 'id', 'nickname', 'avatar' ], // 要查询的表字段(既返回的数据)
    });
    return results;
  }
  // 获取管理员列表(分页)
  async list() {
    // 过滤json对象里面没有值的属性
    const { filterNullObj } = this.ctx.helper;
    // 获取查询参数
    // console.log(this.ctx.request.body);
    // 过滤没有值的参数
    const requestObj = filterNullObj(this.ctx.request.body);

    // 获取10条数据
    const list = await this.app.mysql.select('lin_admin', {
      // 是管理员
      where: requestObj,
      columns: [ 'id', 'nickname', 'avatar', 'admin', 'active', 'group_id', 'create_time', 'update_time' ], // 要查询的表字段
      // 排序方式(创建时间->id)
      orders: [[ 'create_time', 'desc' ], [ 'id', 'desc' ]],
      limit: 10, // 返回数据量(size)
      // offset: 0, // 数据偏移量(page的位置,从哪里取)
    });
    // 统计总条数
    const total = await this.app.mysql.count('lin_admin');

    // 组装数据
    const results = {
      list,
      total,
    };

    return results;
  }

  // 添加管理员
  // 编辑管理员
  // 删除管理员

}

module.exports = AdminService;

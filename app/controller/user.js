/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 08:36:44
 * @LastEditTime: 2019-08-22 18:48:49
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 基础控制类
const BaseController = require('./base');
// Md5加密:方法1
const Md5 = require('md5');

// Md5加密:方法2(node内置加密模块)
// nodejs内置的加密模块
// const crypto = require('crypto');
// const Md5 = crypto.createHash('md5');


class UserController extends BaseController {
  // 图片验证码
  async verify() {
    const { ctx } = this;
    const captcha = await this.service.user.captcha(); // 服务里面的方法
    ctx.response.type = 'image/svg+xml'; // 知道你个返回的类型
    ctx.body = captcha.data; // 返回一张图片
  }
  // 登录
  async login() {
    // ctx: egg全局的上下文对象(request和response都在里面)
    const { ctx, app } = this;
    // this.ctx.session.code
    // console.log(`图形验证码:${ctx.session.code}`);
    // helper实用工具函数(定义在:extend/helper.js)
    // const { helper } = this.ctx;
    const { formatLoggerMsg } = this.ctx.helper;
    /* 日志配置-start */
    // 自定义日志(扩展extend实现)
    // this.ctx.swLog.info('请求开始');

    // egg自带系统日志
    // ctx.logger.info('请求开始');

    // 配置的自定义日志
    // ctx.getLogger('formatLogger').info('ctx', '测试请求');

    // 日志提示message格式化
    // ctx.getLogger('formatLogger').info(formatLoggerMsg('测试请求', '用户名'));
    /* 日志配置-end */


    // 获取账号密码
    const { username, password, vcode } = ctx.request.body;
    // console.log(`图形验证码:${ctx.session.code}`);

    // 账号密码校验规则
    const rule = {
      username: [
        { required: true, message: '用户名不能为空' },
        { type: 'string', message: '用户名必须是字符串' },
      ],
      password: [
        { required: true, message: '密码不能为空' },
        { type: 'string', message: '提交类型必须是字符串' },
        {
          type: 'string',
          min: 6,
          max: 20,
          message: '密码长度为6-20位',
        },
      ],
      vcode: [
        { required: true, message: '验证码不能为空' },
        {
          type: 'string',
          len: 4,
          message: '验证码长度为4位',
        },
      ],
    };

    // 拿到验证结果
    const validateResult = await ctx.validate(rule, {
      username,
      password,
      vcode,
    });
    if (!validateResult) {
      // 错误日志
      ctx.getLogger('formatLogger').info(formatLoggerMsg('参数格式错误', username));
      return;
    }

    // console.log(validateResult);
    // const user = await ctx.service.user.find(userId);
    // 校验用户名
    const user = await app.mysql.get('lin_user', { nickname: username });
    // console.log(`user is ${JSON.stringify(user)}`);
    if (!user) {
      // 错误日志
      ctx.getLogger('formatLogger').info(formatLoggerMsg('用户不存在', username));
      this.sendFail({}, '用户不存在', 10003);
      return;
    }
    // 校验密码(简单Md5加密)
    /* 方法1:MD5插件 */
    if (user.password !== Md5(password)) {
      // 错误日志
      ctx.getLogger('formatLogger').info(formatLoggerMsg('登录密码错误', username));
      this.sendFail({}, '密码错误', 10003);
      return;
    }

    /* 方法2:node内置的加密模块 */
    // Md5.update(password);
    // const md5Password = Md5.digest('hex');
    // if (user.password !== md5Password) {
    //   this.sendFail({}, '密码错误', 10003);
    //   return;
    // }

    // 判断图形验证码
    const { code } = ctx.session;
    console.log(code);
    if (vcode !== code) {
      console.log(vcode);
      // 错误日志
      ctx.getLogger('formatLogger').info(formatLoggerMsg('验证码错误', username));
      this.sendFail({}, '验证码错误', 10003);
      return;
    }

    // 生成token(用户创建时间,jwt秘钥,过期时间:2小时(3d表示3天))
    const token = app.jwt.sign({ id: user.id, time: user.create_time }, app.config.jwt.secret, { expiresIn: '3d' });

    // 返回数据
    const data = {
      token,
      id: user.id,
    };

    ctx.getLogger('formatLogger').info(formatLoggerMsg('登录成功', username));

    this.sendSuccess(data, '登录成功');

  }
  async info() {
    const { app, ctx } = this;
    const { id } = ctx.request.headers;
    // 获取token
    // const token = ctx.request.headers.authorization.split(' ')[1];
    // token解密
    // const decoded = app.jwt.verify(token, app.config.jwt.secret);

    // const { id } = decoded;
    // 通过id获取个人信息(id,昵称,头像,)
    const results = await app.mysql.select('lin_user', { // 搜索 lin_user 表
      where: { id }, // WHERE 条件
      columns: [ 'id', 'nickname', 'avatar' ], // 要查询的表字段(既返回的数据)
    });

    // 没有查询到id对应的用户
    if (results.length === 0) {
      this.sendFail({}, '用户不存在', 10003);
      return;
    }
    // 返回数据
    this.sendSuccess(results[0], 'ok');
  }
}

module.exports = UserController;

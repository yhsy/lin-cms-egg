/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 08:36:44
 * @LastEditTime: 2019-08-21 09:13:44
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 基础控制类
const BaseController = require('./base');
const Md5 = require('md5');

class UserController extends BaseController {
  // 登录
  async login() {
    // ctx: egg全局的上下文对象(request和response都在里面)
    const { ctx, app } = this;
    // 获取账号密码
    const { username, password } = ctx.request.body;

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
          code: 1003,
        },
      ],
    };

    // 拿到验证结果
    const validateResult = await ctx.validate(rule, {
      username,
      password,
    });
    if (!validateResult) return;

    // console.log(validateResult);
    // const user = await ctx.service.user.find(userId);
    // 校验用户名
    const user = await app.mysql.get('lin_user', { nickname: username });
    // console.log(`user is ${JSON.stringify(user)}`);
    if (!user) {
      this.sendFail({}, '用户不存在', 10003);
      return;
    }
    // 校验密码(简单Md5加密)
    if (user.password !== Md5(password)) {
      this.sendFail({}, '密码错误', 10003);
      return;
    }

    // 生成token(用户创建时间,jwt秘钥,过期时间:2小时(3d表示3天))
    const token = app.jwt.sign({ id: user.id, time: user.create_time }, app.config.jwt.secret, { expiresIn: '3d' });

    // 返回数据
    const data = {
      token,
    };
    this.sendSuccess(data, '登录成功');

  }
  async info() {
    const { app, ctx } = this;
    // 获取token
    const token = ctx.request.headers.authorization.split(' ')[1];
    // token解密
    const decoded = app.jwt.verify(token, app.config.jwt.secret);

    const { id } = decoded;
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
    this.sendSuccess(results, 'ok');
  }
}

module.exports = UserController;

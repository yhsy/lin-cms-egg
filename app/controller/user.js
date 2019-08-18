'use strict';
// 基础控制类
const BaseController = require('./base');

class UserController extends BaseController {
  // 登录
  async login() {
    // egg全局的上下文对象(request和response都在里面)
    const { ctx } = this;
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
    const validateResult = await this.ctx.validate(rule, {
      username,
      password,
    });
    if (!validateResult) return;

    // console.log(validateResult);
    // const user = await ctx.service.user.find(userId);
    const user = await this.app.mysql.get('lin_user', { id: 1 });
    console.log(`user is ${JSON.stringify(user)}`);

    const data = {
      msg: '登录成功',
      username,
      password,
    };
    this.sendSuccess(data, 'ok');
    // if (!validateResult) {
    //   this.sendFail(data, '账号或密码错误', 10002);
    // } else {
    // this.sendSuccess(data, 'ok');
    // }

    // console.log(`username is ${username}, password is ${password}`);

    // 登录失败返回
    // this.sendFail(data, '账号或密码错误', 10002);
    // 登录成功返回
    // this.sendSuccess(data, 'ok');
  }
  async info() {
    const data = {
      name: '洪双',
      age: '31',
    };

    this.sendSuccess(data, 'ok');
  }
}

module.exports = UserController;

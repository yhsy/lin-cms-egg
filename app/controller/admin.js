/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 08:36:44
 * @LastEditTime: 2019-09-29 08:47:41
 * @LastEditors: Please set LastEditors
 */
'use strict';
// 基础控制类
const BaseController = require('./base');
// Md5加密:方法1
const Md5 = require('md5');
// 自定义校验规则
const AdminRule = require('../rules/admin');

// const AdminRule = require('../rules/admin');
// console.log(`AdminRule is ${AdminRule.edit}`);

// Md5加密:方法2(node内置加密模块)
// nodejs内置的加密模块
// const crypto = require('crypto');
// const Md5 = crypto.createHash('md5');

class AdminController extends BaseController {
  // 图片验证码
  async verify() {
    const { ctx } = this;
    const captcha = await this.service.admin.captcha(); // 服务里面的方法
    ctx.response.type = 'image/svg+xml'; // 返回的类型
    ctx.body = captcha.data; // 返回一张图片
  }
  // 登录
  async login() {
    // ctx: egg全局的上下文对象(request和response都在里面)
    const { ctx, app, service } = this;
    const { formatLoggerMsg } = this.ctx.helper;

    // this.ctx.session.code
    // console.log(`图形验证码:${ctx.session.code}`);
    // helper实用工具函数(定义在:extend/helper.js)
    // const { helper } = this.ctx;
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
    // const { username, password, vcode } = ctx.request.body;
    const { username, password } = ctx.request.body;

    // console.log(`图形验证码:${ctx.session.code}`);

    // 账号密码校验规则
    const rules = AdminRule.login;
    // console.log(AdminRule.login);

    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      username,
      password,
      // vcode,
    });
    if (!validateResult) return;

    // console.log(validateResult);
    // 获取用户所有信息(通过username)
    // const user = await app.mysql.get('lin_user', { nickname: username });
    const user = await service.admin.allInfo({ nickname: username });
    // console.log(`user is ${JSON.stringify(user)}`);
    // 校验用户名
    if (!user) {
      // 错误日志
      this.sendFail('用户不存在');
      return;
    }
    // 校验密码(简单Md5加密)
    /* 方法1:MD5插件 */
    if (user.password !== Md5(password)) {
      // 错误日志
      this.sendFail('密码错误');
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
    // const { code } = ctx.session;
    // console.log(code);
    // if (vcode !== code) {
    //   // 错误日志
    //   this.sendFail('验证码错误');
    //   return;
    // }

    // 生成token(用户创建时间,jwt秘钥,过期时间:2小时(3d表示3天))
    const token = app.jwt.sign(
      { id: user.id, time: user.create_time },
      app.config.jwt.secret,
      { expiresIn: '3d' }
    );

    // 返回数据
    const data = {
      token,
      id: user.id,
    };

    ctx.getLogger('formatLogger').info(formatLoggerMsg('登录成功', username));

    this.sendSuccess(data, '登录成功');
  }
  // 获取个人信息
  async info() {
    const { app, ctx, service } = this;

    // 这里获取的是字符串
    const { id } = ctx.request.headers;

    // 校验id
    const rules = AdminRule.info;
    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      id,
    });
    if (!validateResult) return;
    // 获取token
    // const token = ctx.request.headers.authorization.split(' ')[1];
    // token解密
    // const decoded = app.jwt.verify(token, app.config.jwt.secret);
    // 从token中提取用户id
    // const { id } = decoded;

    // 根据用户id,获取用户信息
    const results = await service.admin.info({ id });

    // 没有查询到id对应的用户
    if (results.length === 0) {
      this.sendErrmsg('管理员-不存在');
      return;
    }
    // 返回数据
    this.sendSuccess(results[0], '获取成功');
  }

  // 获取管理员列表(分页)
  async list() {
    const { ctx, service } = this;
    const { page, limit } = this.ctx.request.query;

    // page校验
    const rules = AdminRule.list;
    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      page: Number(page),
      limit: Number(limit),
    });
    if (!validateResult) return;

    const results = await service.admin.list();
    if (!results) {
      this.sendErrmsg('获取失败,请重试');
      return;
    }
    this.sendSuccess(results, '获取成功');
  }

  // 添加管理员
  async add() {
    const { ctx, service } = this;
    const { username, password, group_id } = this.ctx.request.body;

    // 账号密码校验规则
    const rules = AdminRule.add;

    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      username,
      password,
      group_id,
    });
    if (!validateResult) return;

    // 添加管理员到数据库(获取插入结果)
    const results = await service.admin.add();
    if (!results) {
      // 错误日志
      this.sendErrmsg('管理员-添加失败,请重试');
      return;
    }

    this.sendSuccess({}, '管理员-添加成功');
  }
  // 删除管理员
  async delete() {
    const { ctx, service } = this;
    const { id } = this.ctx.request.body;

    const rules = AdminRule.id;
    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      id,
    });
    if (!validateResult) return;

    // 是否存在该ID
    const idInfo = await service.admin.allInfo({ id });

    if (!idInfo) {
      // 错误日志
      this.sendErrmsg('管理员-ID不存在');
      return;
    }

    const results = await service.admin.delete(id);
    if (!results) {
      // 错误日志
      this.sendErrmsg('管理员-删除失败,请重试');
      return;
    }
    this.sendSuccess({}, '管理员-删除成功');
  }
  // 编辑管理员
  async edit() {
    const { ctx, service } = this;
    const { id, username, password, create_time, update_time, delete_time } = ctx.request.body;

    // 校验规则
    const rules = AdminRule.id;

    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      id,
    });
    if (!validateResult) return;

    // 不能修改用户名和密码
    if (username || password || create_time || update_time || delete_time) {
      // 错误日志
      this.sendErrmsg('管理员-用户名和密码不能修改');
      return;
    }

    const { filterNullObj } = ctx.helper;
    const requestObj = filterNullObj(ctx.request.body);
    // console.log(`requestObj: ${JSON.stringify(requestObj)}`);
    // 获取JSON长度
    // console.log(Object.keys(requestObj).length);
    // 对象的长度(既属性的数量):object没有length属性
    const requestObjLen = Object.keys(requestObj).length;

    // 修改的内容必须包含一个其他参数
    if (requestObjLen < 2) {
      this.sendErrmsg('管理员-不能修改,参数错误');
      return;
    }

    // 判断id是否存在
    // 是否存在该ID
    const idInfo = await service.admin.allInfo({ id });

    if (!idInfo) {
      // 错误日志
      this.sendErrmsg('管理员-ID不存在');
      return;
    }

    // 插入到数据库
    const results = await service.admin.edit(requestObj);
    if (!results) {
      // 错误日志
      this.sendErrmsg('管理员信息-修改失败,请重试');
      return;
    }

    this.sendSuccess({}, '管理员信息-修改成功');
  }
  // 修改密码
  async changePassword() {
    const { ctx, service } = this;
    const { id, oldPassword, password } = ctx.request.body;

    if (!oldPassword) {
      const eRules = AdminRule.editPassword;
      // 拿到验证结果
      const eResult = await ctx.validate(eRules, {
        id, password,
      });
      if (!eResult) return;
    } else {
      // 校验规则
      const rules = AdminRule.changePassword;

      // 拿到验证结果
      const validateResult = await ctx.validate(rules, {
        id, oldPassword, password,
      });

      if (!validateResult) return;
    }

    // 判断id是否存在
    // 是否存在该ID
    const idInfo = await service.admin.allInfo({ id });

    if (!idInfo) {
      // 错误日志
      this.sendErrmsg('管理员-ID不存在');
      return;
    }

    if (oldPassword) {
      // 校验旧密码
      if (Md5(oldPassword) !== idInfo.password) {
        // 错误日志
        this.sendFail('旧密码错误');
        return;
      }
    }

    // 插入到数据库
    const results = await service.admin.changePassword();
    if (!results) {
      // 错误日志
      this.sendErrmsg('管理员密码-修改失败,请重试');
      return;
    }

    this.sendSuccess({}, '修改成功');
  }
  // 修改管理员-状态
  async editStatus() {
    const { ctx, service } = this;
    const { id, active } = ctx.request.body;
    const reqObj = {
      id,
      active,
    };

    // 校验规则
    const rules = AdminRule.editStatus;

    // 拿到验证结果
    const validateResult = await ctx.validate(rules, {
      id,
      active,
    });
    if (!validateResult) return;

    // 判断id是否存在
    // 是否存在该ID
    const idInfo = await service.admin.allInfo({ id });

    if (!idInfo) {
      // 错误日志
      this.sendErrmsg('管理员-ID不存在');
      return;
    }

    // 插入到数据库
    const results = await service.admin.edit(reqObj);
    if (!results) {
      // 错误日志
      this.sendErrmsg('管理员信息-修改失败,请重试');
      return;
    }

    this.sendSuccess({}, '修改成功');
  }
}

module.exports = AdminController;

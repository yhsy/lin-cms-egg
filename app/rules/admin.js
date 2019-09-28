/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:44:32
 * @LastEditTime: 2019-09-27 08:56:45
 * @LastEditors: Please set LastEditors
 */
'use strict';

const BaseRule = require('./base');
const { page, limit, id, username, password, group_id } = BaseRule;
/* 管理员-校验规则 */
const AdminRule = {
  // 登录
  login: {
    // 用户名
    username,
    // 密码
    password,
    // 验证码
    // vcode: [
    //   { required: true, message: '验证码不能为空' },
    //   {
    //     type: 'string',
    //     len: 4,
    //     message: '验证码长度为4位',
    //   },
    // ],
  },
  // 获取个人信息
  info: {
    id: [
      { required: true, message: 'ID不能为空' },
    ],
  },
  // 列表
  list: {
    page,
    limit,
  },
  // 添加
  add: {
    username,
    password,
    group_id,
  },
  editPassword: {
    id,
    password,
  },
  // 编辑和删除
  id: {
    id,
  },
  changePassword: {
    id,
    oldPassword: [
      { required: true, message: '旧密码不能为空' },
      { type: 'string', message: '参数类型为字符串' },
      {
        len: 32,
        message: '密码长度为32位',
      },
    ],
    password,
  },
};

module.exports = AdminRule;


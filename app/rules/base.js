/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:44:32
 * @LastEditTime: 2019-08-26 12:14:45
 * @LastEditors: Please set LastEditors
 */
'use strict';

/* 基础的校验规则 */
const BaseRule = {
  id: [
    { required: true, message: 'ID不能为空' },
    { type: 'number', message: 'ID类型为数字' },
  ],
  username: [
    { required: true, message: '用户名不能为空' },
    { type: 'string', message: '用户名必须是字符串' },
  ],
  password: [
    { required: true, message: '密码不能为空' },
    { type: 'string', message: '密码类型为字符串' },
    {
      type: 'string',
      min: 6,
      max: 20,
      message: '密码长度为6-20位',
    },
  ],
  page: [
    { required: true, message: 'page不能为空' },
    { type: 'number', message: 'page类型为数字' },
  ],
  // 管理员-分组id
  group_id: [{ required: true, message: '分组不能为空' }],
};

module.exports = BaseRule;


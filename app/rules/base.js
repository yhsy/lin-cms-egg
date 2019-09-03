/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:44:32
 * @LastEditTime: 2019-09-03 09:28:47
 * @LastEditors: Please set LastEditors
 */
'use strict';

// const { sanitize } = require('validator');

// 验证输入的数字比min小
const validateNumberMin = (rule, value, callback) => {
  const val = Number(value);
  // console.log(`val is ${val}`);
  // console.log(`rule的min${rule.options.min}`);
  if (val !== '' && rule.options.min !== '' && val < rule.options.min) {
    // console.log('这里进来了1');
    // return callback(new Error('page范围为1到100之间'));
    return callback(new Error());
  }
  callback();
};
// 验证输入的数字比max大
const validateNumberMax = (rule, value, callback) => {
  const val = Number(value);
  if (val !== '' && rule.options.max !== '' && val > rule.options.max) {
    // console.log('这里进来了2');
    // console.log(`val is ${val}`);
    // console.log(`rule的max${rule.options.max}`);
    return callback(new Error());
  }
  callback();
};

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
      min: 6,
      max: 20,
      message: '密码长度为6-20位',
    },
  ],
  page: [
    { required: true, message: 'page不能为空' },
    { type: 'integer', message: 'page类型为整数' },
    {
      validator: validateNumberMin,
      message: 'page范围为1到100之间',
      options: { min: 1 },
    },
    {
      validator: validateNumberMax,
      message: 'page范围为1到100之间',
      options: { max: 100 },
    },
  ],
  // 管理员-分组id
  group_id: [{ required: true, message: '分组不能为空' }],
  // 序号
  sort: [
    { required: true, message: '序号不能为空' },
    { type: 'integer', message: '序号类型为整数' },
  ],
  img_url: [
    { required: true, message: '图片地址不能为空' },
    { type: 'url', message: '图片地址为url标准地址' },
  ],
  is_show: [
    { required: true, message: '是否显示:不能为空' },
    { type: 'enum', enum: [ 0, 1 ], message: '是否显示:参数错误' },
  ],
  // 文章标题
  title: [
    { required: true, message: '标题不能为空' },
    { type: 'string', min: 4, max: 30, message: '标题为4-30个字符' },
  ],
  // 文章-作者
  author: [
    { required: true, message: '作者不能为空' },
    { type: 'string', min: 2, max: 10, message: '作者为4-10个字符' },
  ],
  // 文章-封面
  cover: [
    { required: true, message: '封面图片不能为空' },
    { type: 'url', message: '封面图片为url标准地址' },
  ],
  // 文章-链接地址
  url: [
    { required: true, message: '链接地址不能为空' },
    { type: 'url', message: '链接地址错误' },
  ],
  // 文章-内容
  content: [
    { required: true, message: '内容不能为空' },
    { type: 'string', min: 20, message: '内容最少20个字符' },
  ],
  // 文章-状态
  status: [
    { required: true, message: '状态不能为空' },
    { type: 'enum', enum: [ 0, 1 ], message: '状态参数错误' },
  ],
  // 条数(1-50)
  limit: [
    { required: true, message: 'limit不能为空' },
    { type: 'integer', message: 'limit类型为整数' },
    {
      validator: validateNumberMin,
      message: 'limit范围为1到100之间',
      options: { min: 1 },
    },
    {
      validator: validateNumberMax,
      message: 'limit范围为1到100之间',
      options: { max: 100 },
    },
  ],
  startTime: [{ required: true, message: '开始时间不能为空' }],
  endTime: [{ required: true, message: '开始时间不能为空' }],
  // 栏目id
  cid: [
    { required: true, message: '栏目ID不能为空' },
    { type: 'number', message: '栏目ID类型为数字' },
  ],
  // 栏目名称
  cname: [
    { required: true, message: '栏目名称不能为空' },
    { type: 'string', min: 2, max: 10, message: '栏目名称为2-10个字符' },
  ],
  job_num: [
    { required: true, message: '招聘数量不能为空' },
    { type: 'integer', message: '招聘人数为整数' },
    {
      validator: validateNumberMin,
      message: '招聘人数范围为1到100之间',
      options: { min: 1 },
    },
    {
      validator: validateNumberMax,
      message: '招聘人数范围为1到100之间',
      options: { max: 100 },
    },
  ],
  // 加盟-留言人
  join_name: [
    { required: true, message: '名称不能为空' },
    { type: 'string', min: 2, max: 30, message: '名称为2-30个字符' },
  ],
  // 手机号
  phone: [
    { required: true, message: '手机不能为空' },
    {
      type: 'string',
      pattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
      transform(value) {
        // return sanitize(value).trim();
        return value.trim();
      },
      message: '手机号码格式错误',
    },
  ],
  // 地址
  address: [
    { required: true, message: '地址不能为空' },
    { type: 'string', min: 10, max: 100, message: '地址为10-100个字符' },
  ],
};

module.exports = BaseRule;

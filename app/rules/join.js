/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:57:28
 * @LastEditTime: 2019-09-04 08:55:08
 * @LastEditors: Please set LastEditors
 */


'use strict';
const BaseRule = require('./base');
const {
  join_name, phone, address, id, page, limit, status,
} = BaseRule;
const JoinRules = {
  add: {
    name: join_name,
    phone,
    address,
  },
  edit: {
    id,
    name: join_name,
    phone,
    address,
    // desc,
  },
  editStatus: {
    id,
    status: [
      { required: true, message: '状态不能为空' },
      { type: 'enum', enum: [0, 1, 2], message: '状态参数错误' },
    ],
  },
  editDesc: {
    id,
    desc: [
      { required: true, message: '备注不能为空' },
    ]
  },
  del: {
    id,
  },
  list: {
    page,
    limit,
  },
  // create_at: {
  //   startTime,
  //   endTime,
  // },
};
module.exports = JoinRules;

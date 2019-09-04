/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:57:28
 * @LastEditTime: 2019-09-04 08:40:55
 * @LastEditors: Please set LastEditors
 */


'use strict';
const BaseRule = require('./base');
const {
  join_name, phone, address, id,
  // id, cid, title, job_num, content, page, limit
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
  },
//   del: {
//     id,
//   },
//   list: {
//     page,
//     limit,
//   },
  // create_at: {
  //   startTime,
  //   endTime,
  // },
};
module.exports = JoinRules;

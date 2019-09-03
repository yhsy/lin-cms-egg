/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:57:28
 * @LastEditTime: 2019-09-03 09:16:40
 * @LastEditors: Please set LastEditors
 */


'use strict';
const BaseRule = require('./base');
const {
  join_name, phone, address,
  // id, cid, title, job_num, content, page, limit
} = BaseRule;
const JoinRules = {
  add: {
    name: join_name,
    phone,
    address,
  },
//   edit: {
//     id,
//     cid,
//     title,
//     num: job_num,
//     content,
//   },
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

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:54:57
 * @LastEditTime: 2019-09-16 09:00:11
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { cid, cname, sort, status, page, limit } = BaseRule;
const ColumnsRules = {
  add: {
    cname,
    type: [
      { required: true, message: '栏目类型不能为空' },
    ],
    sort,
    link: [
      { required: true, message: '链接地址不能为空' },
    ],
  },
  edit: {
    cid,
    cname,
    status,
  },
  del: {
    cid,
  },
  list: {
    page,
    limit,
  },
};
module.exports = ColumnsRules;

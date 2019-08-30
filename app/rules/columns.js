/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:54:57
 * @LastEditTime: 2019-08-30 18:46:01
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { cid, cname, status, page, limit } = BaseRule;
const ColumnsRules = {
  add: {
    cname,
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

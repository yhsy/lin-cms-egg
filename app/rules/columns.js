/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:54:57
 * @LastEditTime: 2019-08-30 10:00:55
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { cid, cname, status, page, limit } = BaseRule;
const ColumnsRules = {
  add: {
    cname,
  },
};
module.exports = ColumnsRules;

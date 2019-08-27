/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 11:25:34
 * @LastEditTime: 2019-08-27 18:01:01
 * @LastEditors: Please set LastEditors
 */
'use strict';
const moment = require('moment');
const Utils = {
  // 过滤json对象里面没有值的属性
  filterNullObj(obj) {
    for (const i in obj) {
      if (obj[i] === '') {
        delete obj[i];
      }
    }
    return obj;
  },
  formatTimeYMDH(list) {
    for (let i = 0; i < list.length; i++) {
      list[i].create_time = moment(list[i].create_time).format('YYYY-MM-DD HH:mm:ss');
      list[i].update_time = moment(list[i].update_time).format('YYYY-MM-DD HH:mm:ss');
    }
    return list;
  },
};
module.exports = Utils;

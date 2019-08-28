/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 17:07:30
 * @LastEditTime: 2019-08-28 11:49:02
 * @LastEditors: Please set LastEditors
 */
'use strict';

module.exports = {
  // 日志格式化
  formatLoggerMsg(msg, id) {
    return `[${msg}][用户id:${id}]`;
  },
  // 过滤json对象里面没有值的属性
  filterNullObj(obj) {
    for (const i in obj) {
      if (obj[i] === '') {
        delete obj[i];
      }
    }
    return obj;
  },
};

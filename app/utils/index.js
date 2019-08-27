/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 11:25:34
 * @LastEditTime: 2019-08-27 11:26:09
 * @LastEditors: Please set LastEditors
 */
'use strict';
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
};
module.exports = Utils;

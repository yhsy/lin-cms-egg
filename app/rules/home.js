/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:52:41
 * @LastEditTime: 2019-08-27 11:51:56
 * @LastEditors: Please set LastEditors
 */
'use strict';
const BaseRule = require('./base');
const { sort, img_url, is_show } = BaseRule;
const HomeRules = {
  addBanner: {
    sort,
    img_url,
    is_show,
  }
  ,
};
module.exports = HomeRules;

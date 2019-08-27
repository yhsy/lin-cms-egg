/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:52:41
 * @LastEditTime: 2019-08-27 16:14:03
 * @LastEditors: Please set LastEditors
 */
'use strict';
const BaseRule = require('./base');
const { sort, img_url, is_show, id } = BaseRule;
const HomeRules = {
  addBanner: {
    sort,
    img_url,
    is_show,
  },
  editBanner: {
    id,
    sort,
    img_url,
    is_show,
  },
  delBanner: {
    id,
  },
};
module.exports = HomeRules;

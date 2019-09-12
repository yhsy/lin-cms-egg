/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 10:52:41
 * @LastEditTime: 2019-09-12 09:26:17
 * @LastEditors: Please set LastEditors
 */
'use strict';
const BaseRule = require('./base');
const { title, sort, img_url, is_show, id, page } = BaseRule;
const HomeRules = {
  addBanner: {
    sort,
    title,
    img_url,
    link: [
      { required: true, message: '链接不能为空' },
      { min: 1, max: 50, message: '链接地址为1-50个字符' },
    ],
    // is_show,
  },
  editBanner: {
    id,
    sort,
    title,
    img_url,
    link: [
      { required: true, message: '链接不能为空' },
      { min: 1, max: 50, message: '链接地址为1-50个字符' },
    ],
    // is_show,
  },
  isShow: {
    id,
    is_show,
  },
  delBanner: {
    id,
  },
  list: {
    page,
  },
};
module.exports = HomeRules;

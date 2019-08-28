/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:41:52
 * @LastEditTime: 2019-08-28 20:12:57
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { title, author, cover, content, url } = BaseRule;
const ArticleRules = {
  add: {
    title,
    author,
    cover,
    url,
    content,
  },
};
module.exports = ArticleRules;

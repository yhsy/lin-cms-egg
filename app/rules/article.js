/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:41:52
 * @LastEditTime: 2019-08-29 10:19:56
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { id, title, author, cover, content, url, status } = BaseRule;
const ArticleRules = {
  add: {
    title,
    author,
    cover,
    url,
    content,
  },
  edit: {
    id,
    title,
    author,
    cover,
    url,
    content,
    status,
  },
  del: {
    id,
  },

};
module.exports = ArticleRules;

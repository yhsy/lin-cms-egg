/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:41:52
 * @LastEditTime: 2019-08-29 11:12:37
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { id, title, author, cover, content, url, status, page, limit, startTime, endTime } = BaseRule;
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
  list: {
    page,
    limit,
  },
  create_at: {
    startTime,
    endTime,
  },
};
module.exports = ArticleRules;

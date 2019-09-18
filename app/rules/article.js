/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 19:41:52
 * @LastEditTime: 2019-08-29 11:12:37
 * @LastEditors: Please set LastEditors
 */

'use strict';
const BaseRule = require('./base');
const { id, cid, title, author, cover, content, link, status, page, limit, startTime, endTime } = BaseRule;
const ArticleRules = {
  add: {
    cid,
    title,
    author,
    cover,
    url: link,
    content,
  },
  edit: {
    id,
    cid,
    title,
    author,
    cover,
    url: link,
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

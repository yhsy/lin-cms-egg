

'use strict';
const BaseRule = require('./base');
const { id, cid, title, job_num, content, page, limit, } = BaseRule;
const JobsRules = {
  add: {
    cid,
    title,
    num: job_num,
    content: [
      { required: true, message: '内容不能为空' },
      { type: 'string', min: 2, message: '内容最少2个字符' },
    ],
  },
  edit: {
    id,
    cid,
    title,
    num: job_num,
    content,
  },
  del: {
    id,
  },
  list: {
    page,
    limit,
  },
  // create_at: {
  //   startTime,
  //   endTime,
  // },
};
module.exports = JobsRules;

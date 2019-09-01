

'use strict';
const BaseRule = require('./base');
const { id, cid, title, job_num, content, } = BaseRule;
const JobsRules = {
  add: {
    cid,
    title,
    num: job_num,
    content,
  },
  edit: {
    id,
    cid,
    title,
    num: job_num,
    content,
  },
  // del: {
  //   id,
  // },
  // list: {
  //   page,
  //   limit,
  // },
  // create_at: {
  //   startTime,
  //   endTime,
  // },
};
module.exports = JobsRules;

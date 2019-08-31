

'use strict';
const BaseRule = require('./base');
const { cid, title, job_num, content, } = BaseRule;
const JobsRules = {
  add: {
    cid,
    title,
    num: job_num,
    content,
  },
  // edit: {
  //   id,
  //   title,
  //   author,
  //   cover,
  //   url,
  //   content,
  //   status,
  // },
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

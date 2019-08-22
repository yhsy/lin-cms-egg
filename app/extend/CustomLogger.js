/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 08:50:41
 * @LastEditTime: 2019-08-22 17:29:06
 * @LastEditors: Please set LastEditors
 */
'use strict';
// CustomLogger.js
const Logger = require('egg-logger').Logger;
const CustomTransport = require('./CustomTransport.js');

module.exports = function(ctx) {
  const logger = new Logger();
  logger.set('file', new CustomTransport({
    level: 'INFO',
    file: 'logs/custom/app.log',
  }, ctx));
  return logger;
};

// const Logger = require('egg-logger').Logger;
// const CustomTransport = require('./CustomTransport.js');
// const logger = new Logger();
// logger.set('file', new CustomTransport({
//   level: 'INFO',
//   file: 'app.log',
// }));

// module.exports = logger;


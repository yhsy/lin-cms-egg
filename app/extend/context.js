/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 08:51:52
 * @LastEditTime: 2019-08-22 09:36:04
 * @LastEditors: Please set LastEditors
 */
'use strict';
const Logger = require('egg-logger').Logger;
const CustomTransport = require('./CustomTransport');
const CustomLogger = require('./CustomLogger');
module.exports = {
  get swLog() {
    return CustomLogger(this);
  },
};

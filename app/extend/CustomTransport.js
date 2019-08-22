/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 08:48:37
 * @LastEditTime: 2019-08-22 10:06:58
 * @LastEditors: Please set LastEditors
 */
'use strict';
// CoustomTransport.js
const moment = require('moment');
// 自定义日志输出到文件(默认路径: /app.log)
const FileTransport = require('egg-logger').FileTransport;
// 自定义日志输出到控制台
const ConsoleTransport = require('egg-logger').ConsoleTransport;

class CustomTransport extends ConsoleTransport {
  constructor(options, ctx) {
    super(options);
    this.ctx = ctx;
  }

  // 日志对象输出
  log(level, args, meta) {
    const prefixStr = this.buildFormat(level);
    for (const i in args) {
      if (args.hasOwnProperty(i)) {
        if (parseInt(i, 10) === 0) {
          args[i] = `${prefixStr}${args[i]}`;
        }
        if (parseInt(i, 10) === args.length - 1) {
          args[i] += '\n';
        }
      }
    }

    super.log(level, args, meta);
  }

  // 格式化日志[time][lever][threadNameStr][urlStr] message
  // 举例:[2019-08-22 09:56:11.927][INFO][6766][/api/user/login]请求开始
  buildFormat(level) {
    const timeStr = `[${moment().format('YYYY-MM-DD HH:mm:ss.SSS')}]`;
    const threadNameStr = `[${process.pid}]`;
    const urlStr = `[${this.ctx.request.url}]`;
    const levelStr = `[${level}]`;
    return `${timeStr}${levelStr}${threadNameStr}${urlStr}`;
  }

  setUserId(userId) {
    this.userId = userId;
  }
}

module.exports = CustomTransport;

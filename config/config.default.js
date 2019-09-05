/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:56:55
 * @LastEditTime: 2019-08-28 18:16:11
 * @LastEditors: Please set LastEditors
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const path = require('path');

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});
  // egg安全配置
  config.security = {
    // post请求安全(暂时关闭)
    csrf: {
      enable: false,
    },
    // csrf: {
    //   headerName: 'x-csrf-token', // 自定义请求头(客户端)
    //   // queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
    //   // bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
    // },
  };

  // 校验插件配置
  config.validatePlus = {
    resolveError (ctx, errors) {
      if (errors.length) {
        ctx.type = 'json';
        ctx.status = 200;
        ctx.body = {
          success: false,
          code: 1001,
          message: errors[0].message,
          data: {},
          // error: errors,
          // message: '参数错误',
        };
      }
    },
  };

  // mysql配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      // password: '1qaz!QAZ',
      password: 'a123456',
      // 数据库名
      database: 'lin-cms-egg',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };


  // jwt插件配置
  config.jwt = {
    // 秘钥
    secret: 'egg666',
  };

  // 日志分为 NONE，DEBUG，INFO，WARN 和 ERROR 5 个级别
  // 日志输出为Json格式
  config.logger = {
    outputJSON: true,
  };

  // 自定义日志设置
  config.customLogger = {
    formatLogger: {
      // 生成的log文件配置
      file: path.join(appInfo.root, 'logs/api.log'),
      formatter (meta) {
        // console.log('formatter');
        return `[${meta.date}] ${meta.message}`;
      },
      // ctx请求日志(格式化)
      contextFormatter (meta) {
        // console.log('contextFormatter');
        return `[${meta.date}][${meta.level}] [${meta.ctx.method} ${meta.ctx.url}] ${meta.message}`;
      },
    },
  };

  // 日志查看插件(地址栏查看:http://127.0.0.1:7001/__logs)
  config.logview = {};

  // 日志切割配置
  config.logrotator = {
    // 每天切割(默认)
    // 日志大小切割
    filesRotateBySize: [
      path.join(appInfo.root, 'logs', appInfo.name, 'egg-web.log'),
    ],
    // 切割最大值:默认单位 kb
    // 2G切割(2 * 1024 * 1024 * 1024)
    maxFileSize: 1024 * 1024 * 1024,
    // 每小时
    // filesRotateByHour: [
    //   path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log'),
    // ],
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565839029125_2159';

  // 上传文件配置
  config.multipart = {
    mode: 'file',
    // mode: 'stream',
    // fileSize: '50mb',
    // fileExtensions: [ '.xls', '.txt' ], // 扩展几种上传的文件格式
  };

  // squlize配置
  config.sequelize = {
    // 数据库类型
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    // password: '1qaz!QAZ',
    password: 'a123456',
    database: 'lin-cms-egg',
    define: {
      underscored: true, // 注意需要加上这个， egg-sequelize只是简单的使用Object.assign对配置和默认配置做了merge, 如果不加这个 update_at会被转变成 updateAt故报错
      // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
      // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
      freezeTableName: true,
      timestamps: false, // 去除createAt updateAt(默认true-不去掉)
    },
    // 默认UTC时间改成北京时间
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast (field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

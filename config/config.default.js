/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:56:55
 * @LastEditTime: 2019-08-22 09:40:26
 * @LastEditors: Please set LastEditors
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
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
    resolveError(ctx, errors) {
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
      // password: 'a123456',
      password: '1qaz!QAZ',
      // 数据库名
      database: 'lin-cms',
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

  // 日志输出为Json格式
  exports.logger = {
    outputJSON: true,
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1565839029125_2159';

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

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
  // post请求安全(暂时关闭)
  config.security = {
    csrf: {
      enable: false,
    },
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
          error: errors,
          // message: '参数错误',
        };
      }
    },
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

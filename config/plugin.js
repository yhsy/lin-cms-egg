/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:56:58
 * @LastEditTime: 2019-08-28 15:11:13
 * @LastEditors: Please set LastEditors
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 校验插件(官方:egg-validate)
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  // mysql操作插件
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  // jwt插件
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  // 日志查看插件
  logview: {
    package: 'egg-logview',
    // env: ['local', 'default', 'test', 'unittest']
  },
  // ORM框架-操作数据库
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};

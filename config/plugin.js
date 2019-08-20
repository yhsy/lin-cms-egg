/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 08:56:58
 * @LastEditTime: 2019-08-20 08:57:55
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
};

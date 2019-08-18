'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // 校验插件
  validatePlus: {
    enable: true,
    package: 'egg-validate-plus',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};

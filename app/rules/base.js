/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:44:32
 * @LastEditTime: 2019-08-26 11:45:56
 * @LastEditors: Please set LastEditors
 */
'use strict';

/* 基础的校验规则 */
const BaseRule = {
  id: [
    { required: true, message: 'ID不能为空' },
    { type: 'number', message: 'ID类型为数字' },
  ],
};

module.exports = BaseRule;


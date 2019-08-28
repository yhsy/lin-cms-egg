/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 17:07:43
 * @LastEditTime: 2019-08-28 17:13:02
 * @LastEditors: Please set LastEditors
 */
'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};

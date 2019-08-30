/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:43:11
 * @LastEditTime: 2019-08-30 09:47:39
 * @LastEditors: Please set LastEditors
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 lin_article 表
  up: async (queryInterface, Sequelize) => {
    const { TINYINT, INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('lin_columns', {
      // 栏目id
      cid: { type: INTEGER(4), primaryKey: true, autoIncrement: true },
      // 栏目名称
      cname: { type: STRING(20), allowNull: false },
      // 链接地址
      link: { type: STRING(50) },
      // 状态(0-隐藏,1-显示)
      status: { type: TINYINT(2), allowNull: false, defaultValue: 1 },
      // 软删除(0-否,1-是)
      is_delete: { type: TINYINT(2), allowNull: false, defaultValue: 0 },
      // 创建时间
      created_at: DATE,
      // 更新时间
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 lin_columns 表
  down: async queryInterface => {
    await queryInterface.dropTable('lin_columns');
  },
};

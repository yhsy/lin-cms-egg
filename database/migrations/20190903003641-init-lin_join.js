/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 08:36:41
 * @LastEditTime: 2019-09-03 08:50:47
 * @LastEditors: Please set LastEditors
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 lin_join 表
  up: async (queryInterface, Sequelize) => {
    const { TINYINT, INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('lin_join', {
      // 留言id
      id: { type: INTEGER(8), primaryKey: true, autoIncrement: true },
      // 姓名/企业
      name: { type: STRING(30), allowNull: false },
      // 联系电话(手机)
      phone: { type: INTEGER(11), allowNull: false },
      // 联系地址
      address: { type: STRING(50), allowNull: false },
      // 客户备注信息
      desc: { type: TEXT, allowNull: false, defaultValue: '暂无' },
      // 客户状态(0-未联系,1-已联系)
      status: { type: TINYINT(2), allowNull: false, defaultValue: 0 },
      // 客户类型(0-新客户,1-意向客户,2-老客户)
      type: { type: TINYINT(2), allowNull: false, defaultValue: 0 },
      // 客户拜访记录
      note: { type: TEXT, allowNull: false, defaultValue: '暂无' },
      // 软删除(0-否,1-是)
      is_delete: { type: TINYINT(2), allowNull: false, defaultValue: 0 },
      // 创建时间
      created_at: DATE,
      // 更新时间
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 lin_join 表
  down: async queryInterface => {
    await queryInterface.dropTable('lin_join');
  },
};

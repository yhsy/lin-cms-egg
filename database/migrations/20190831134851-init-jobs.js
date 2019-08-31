
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 lin_jobs 表
  up: async (queryInterface, Sequelize) => {
    const { TINYINT, INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('lin_jobs', {
      // 招聘id
      id: { type: INTEGER(8), primaryKey: true, autoIncrement: true },
      // 栏目id
      cid: { type: INTEGER(8), allowNull: false },
      // 职位名称
      title: { type: STRING(30), allowNull: false },
      // 招聘人数(不填默认1)
      num: { type: INTEGER(8), allowNull: false, defaultValue: 1 },
      // 招聘状态(0-停止招聘,1-招聘中,)
      status: { type: TINYINT(2), allowNull: false, defaultValue: 1 },
      // 招聘要求内容(默认:暂无内容)
      content: { type: TEXT, allowNull: false },
      // 软删除(0-否,1-是)
      is_delete: { type: TINYINT(2), allowNull: false, defaultValue: 0 },
      // 创建时间
      created_at: DATE,
      // 更新时间
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 lin_jobs 表
  down: async queryInterface => {
    await queryInterface.dropTable('lin_jobs');
  },
};

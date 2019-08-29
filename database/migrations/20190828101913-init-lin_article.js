/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 17:28:51
 * @LastEditTime: 2019-08-29 10:10:33
 * @LastEditors: Please set LastEditors
 */

'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 lin_article 表
  up: async (queryInterface, Sequelize) => {
    const { BOOLEAN, INTEGER, DATE, STRING, TEXT } = Sequelize;
    await queryInterface.createTable('lin_article', {
      // 文章id
      id: { type: INTEGER(8), primaryKey: true, autoIncrement: true },
      // 标题
      title: { type: STRING(30), allowNull: false },
      // 作者
      author: STRING(20),
      // 链接地址
      url: { type: STRING(50), allowNull: false },
      // 浏览数
      pageviews: { type: INTEGER(10), allowNull: false, defaultValue: 0 },
      // 描述
      description: STRING(100),
      // 封面图片(默认:暂无图片)
      cover: { type: STRING(50), allowNull: false, defaultValue: 'http://7n.webgo.vip/no-image.jpg' },
      // 状态(0-隐藏,1-显示)
      status: { type: BOOLEAN, allowNull: false, defaultValue: true },
      // 文章内容(默认:暂无内容)
      content: { type: TEXT, allowNull: false, defaultValue: '暂无内容' },
      // 软删除(0-否,1-是)
      is_delete: { type: BOOLEAN, allowNull: false, defaultValue: false },
      // 创建时间
      created_at: DATE,
      // 更新时间
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 lin_article 表
  down: async queryInterface => {
    await queryInterface.dropTable('lin_article');
  },
};

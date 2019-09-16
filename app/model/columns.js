/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 09:48:33
 * @LastEditTime: 2019-09-16 09:10:29
 * @LastEditors: Please set LastEditors
 */

'use strict';

module.exports = app => {
  const { TINYINT, INTEGER, DATE, STRING } = app.Sequelize;
  // 文章-数据库模型
  const Columns = app.model.define('lin_columns', {
    // 栏目id
    cid: { type: INTEGER(4), primaryKey: true, autoIncrement: true },
    // 栏目类型(1-新闻资讯,2-人才招聘)
    type: { type: TINYINT(2), allowNull: false },
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

  return Columns;
};

/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 16:24:22
 * @LastEditTime: 2019-08-28 18:06:07
 * @LastEditors: Please set LastEditors
 */
'use strict';

module.exports = app => {
  // 大坑:创建数据库的时候,表名是lin_articles,结尾有个s
  const { BOOLEAN, INTEGER, DATE, STRING, TEXT } = app.Sequelize;
  // 文章-数据库模型
  const Article = app.model.define('lin_article', {
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
    // 创建时间
    created_at: DATE,
    // 更新时间
    updated_at: DATE,
  });

  return Article;
};

/*
 Navicat Premium Data Transfer

 Source Server         : 本地数据库
 Source Server Type    : MySQL
 Source Server Version : 50725
 Source Host           : localhost:3306
 Source Schema         : lin-cms-egg

 Target Server Type    : MySQL
 Target Server Version : 50725
 File Encoding         : 65001

 Date: 28/08/2019 18:30:26
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of SequelizeMeta
-- ----------------------------
BEGIN;
INSERT INTO `SequelizeMeta` VALUES ('20190828101913-init-lin_article.js');
COMMIT;

-- ----------------------------
-- Table structure for lin_admin
-- ----------------------------
DROP TABLE IF EXISTS `lin_admin`;
CREATE TABLE `lin_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '昵称',
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像url',
  `admin` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否是管理员',
  `active` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否活动',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Email地址',
  `group_id` int(11) DEFAULT NULL COMMENT '用户组id',
  `password` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `nickname` (`nickname`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of lin_admin
-- ----------------------------
BEGIN;
INSERT INTO `lin_admin` VALUES (1, 'super', 'http://7n.webgo.vip/avatar.png', 2, 1, NULL, 2, 'sha1$2a00b748$1$1fef3d3297477b2c9c0f26a5496d3dc64e08bf5a', '2019-08-07 08:48:32', '2019-08-26 10:05:00', NULL);
INSERT INTO `lin_admin` VALUES (2, 'admin01', 'https://s2.ax1x.com/2019/08/05/e29sl8.jpg', 2, 1, NULL, 1, 'e10adc3949ba59abbe56e057f20f883e', '2019-08-20 09:06:56', '2019-08-20 09:06:58', NULL);
INSERT INTO `lin_admin` VALUES (3, 'admin02', 'http://7n.webgo.vip/1.jpg', 1, 1, 'ceshi@qq.com', 3, 'e10adc3949ba59abbe56e057f20f883e', '2019-08-26 09:46:39', '2019-08-26 10:05:57', NULL);
COMMIT;

-- ----------------------------
-- Table structure for lin_article
-- ----------------------------
DROP TABLE IF EXISTS `lin_article`;
CREATE TABLE `lin_article` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `url` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pageviews` int(10) NOT NULL DEFAULT '0',
  `description` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cover` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'http://7n.webgo.vip/no-image.jpg',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of lin_article
-- ----------------------------
BEGIN;
INSERT INTO `lin_article` VALUES (1, '新闻标题', '作者', 'http://www.baidu.com', 1, NULL, 'http://7n.webgo.vip/no-image.jpg', 1, '新闻的内容', '2019-08-28 17:52:05', '2019-08-28 17:52:07');
COMMIT;

-- ----------------------------
-- Table structure for lin_banner
-- ----------------------------
DROP TABLE IF EXISTS `lin_banner`;
CREATE TABLE `lin_banner` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `sort` int(11) NOT NULL COMMENT '排序位置',
  `title` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片标题',
  `desc` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '图片描述',
  `img_url` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '图片地址',
  `link` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '链接地址',
  `is_show` tinyint(4) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示(0-隐藏,1-显示)',
  `is_delete` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '软删除(0-正常,1-删除)',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of lin_banner
-- ----------------------------
BEGIN;
INSERT INTO `lin_banner` VALUES (1, 1, 'banner1的标题', 'banner1的描述', 'http://7n.webgo.vip/banner1.jpg', '#', 1, 1, '2019-08-27 12:02:35', '2019-08-27 16:46:06', NULL);
INSERT INTO `lin_banner` VALUES (2, 2, '', '', 'http://7n.webgo.vip/banner2.jpg', '', 1, 0, '2019-08-27 12:03:32', '2019-08-27 18:05:40', NULL);
INSERT INTO `lin_banner` VALUES (3, 3, 'banenr3', '', 'http://7n.webgo.vip/banner3.jpg', '#', 1, 0, '2019-08-27 16:57:05', '2019-08-27 16:57:05', NULL);
INSERT INTO `lin_banner` VALUES (4, 4, 'banenr4', '', 'http://7n.webgo.vip/banner4.jpg', '#', 0, 0, '2019-08-27 16:57:16', '2019-08-27 18:23:37', NULL);
INSERT INTO `lin_banner` VALUES (5, 5, 'banenr5', '', 'http://7n.webgo.vip/banner5.jpg', '#', 1, 0, '2019-08-27 16:57:24', '2019-08-27 18:05:37', NULL);
INSERT INTO `lin_banner` VALUES (6, 6, 'banenr6', '', 'http://7n.webgo.vip/banner6.jpg', '#', 1, 0, '2019-08-27 16:57:37', '2019-08-27 16:57:37', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
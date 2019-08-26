/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 18:22:02
 * @LastEditTime: 2019-08-26 08:55:19
 * @LastEditors: Please set LastEditors
 */
'use strict';

const Service = require('egg').Service;
// 验证码插件
const svgCaptcha = require('svg-captcha');
// 日期插件
const moment = require('moment');
// Md5加密:方法1
const Md5 = require('md5');

class AdminService extends Service {
  // 生成验证码
  async captcha() {
    const captcha = svgCaptcha.create({
      // 验证码长度
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      // 验证码图片背景颜色
      bacground: '#cc9966',
      // 验证码字符是否有颜色
      color: true,
      // 验证码字符中排除 0o1i
      ignoreChars: '0o1i',
    });
    // 验证码文字存到session里,随机生成的验证码
    this.ctx.session.code = captcha.text;
    return captcha;
  }
  // 获取管理员-全部信息
  async allInfo(obj) {
    // obj = {username: 'xxx'}
    const results = await this.app.mysql.get('lin_admin', obj);
    return results;
  }
  // 获取基础信息
  async info(obj) {
    const results = await this.app.mysql.select('lin_admin', {
      // 搜索 lin_admin 表
      where: obj, // WHERE 条件
      columns: [ 'id', 'nickname', 'avatar' ], // 要查询的表字段(既返回的数据)
    });
    return results;
  }
  // 获取管理员列表(分页)
  async list() {
    // 过滤json对象里面没有值的属性
    const { filterNullObj } = this.ctx.helper;
    // 获取查询参数
    // console.log(this.ctx.request.body);
    // 过滤没有值的参数
    const requestObj = filterNullObj(this.ctx.request.body);
    // 返回结果
    let results = {};

    // 如果有日期筛选(要用mysql原生的查询语句)
    if (requestObj.startTime && requestObj.endTime) {
      results = await this.getTimeList(requestObj);
      return results;
    }
    // 分页
    const { page } = requestObj;
    // 在查询条件里删除page
    delete requestObj.page;
    // 获取10条数据
    const list = await this.app.mysql.select('lin_admin', {
      // 是管理员
      where: requestObj,
      columns: [
        'id',
        'nickname',
        'avatar',
        'admin',
        'active',
        'group_id',
        'create_time',
        'update_time',
      ], // 要查询的表字段
      // 排序方式(创建时间->id)
      orders: [[ 'create_time', 'desc' ], [ 'id', 'desc' ]],
      limit: 10, // 返回数据量(size)
      offset: 10 * (page - 1), // 数据偏移量(page的位置,从哪里取)
    });
    // console.log(`list is ${list}`);
    // 判断该页是否有数据
    if (list.length === 0) {
      results = {
        list,
        total: 0,
      };
      return results;
    }
    // 统计总条数
    const total = await this.app.mysql.count('lin_admin', requestObj);

    // 组装数据
    results = {
      list,
      total,
    };

    return results;
  }
  // 获取管理员列表(日期筛选+分页)
  async getTimeList(obj) {
    // const nickSql = '';
    // const actSql = '';
    // const gidSql = '';
    // 条件sql
    let whereSql = '';

    const { page, startTime, endTime } = obj;
    // console.log(`startTime is ${startTime}, eTime is ${endTime}`);

    if (obj.nickname) {
      // const { nickname } = obj;
      // nickSql = `AND t.nickname = '${nickname}'`;
      whereSql += `AND t.nickname = '${obj.nickname}'`;
    }
    if (obj.active) {
      // const { active } = obj;
      // actSql = `AND t.active = ${active}`;
      whereSql += `AND t.active = ${obj.active}`;
    }
    if (obj.group_id) {
      // const { group_id } = obj;
      // gidSql = `AND t.group_id = ${group_id}`;
      whereSql += `AND t.group_id = ${obj.group_id}`;
    }

    // 分页公式(LIMIT*(page-1))
    const pages = 1 * (page - 1);

    // 获取分页数据
    const querySql = `
      SELECT t.id, t.nickname, t.avatar, t.admin, t.active, t.group_id, t.create_time
      FROM lin_admin t
      WHERE
      t.create_time >= DATE_FORMAT('${startTime}', '%Y-%m-%d %H')
      AND
      t.create_time < DATE_FORMAT('${endTime}', '%Y-%m-%d %H')
      ${whereSql}
      ORDER BY t.create_time DESC
      LIMIT 1 OFFSET ${pages};
      `;
    // 获取数据的总条数
    const countSql = `
      SELECT count(*) as Total
      FROM lin_admin t
      WHERE
      t.create_time >= DATE_FORMAT('${startTime}', '%Y-%m-%d %H')
      AND
      t.create_time < DATE_FORMAT('${endTime}', '%Y-%m-%d %H')
      ${whereSql}
    `;
    const list = await this.app.mysql.query(querySql);
    const count = await this.app.mysql.query(countSql);
    // console.log(count);
    // console.log(count[0].Total);
    // 总条数获取
    const total = count[0].Total;
    // console.log(count.Total);
    const results = {
      list,
      total,
    };
    // return results
    // console.log(results);
    // console.log(total);
    return results;
  }

  // 添加管理员
  async add() {
    const { username, password, group_id } = this.ctx.request.body;
    // console.log(username, password, group_id);
    // 插入
    const results = await this.app.mysql.insert('lin_admin', {
      nickname: username,
      password: Md5(password),
      group_id,
      admin: 2,
      active: 1,
      avatar: 'http://7n.webgo.vip/avatar.png',
    });
    // 判断插入成功(判断是否插入成功 )
    const insertSuccess = results.affectedRows === 1;
    return insertSuccess;
  }
  // 编辑管理员
  // 删除管理员
  async delete(id) {
    const results = await this.app.mysql.delete('lin_admin', {
      id,
    });
    return results;
  }
}

module.exports = AdminService;

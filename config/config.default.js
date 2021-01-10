/* eslint valid-jsdoc: "off" */
const path = require('path');
'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

const isDev = process.env.NODE_ENV === 'development'

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608979796654_8395';


  if(isDev){
    console.log('isDev===0000', isDev)
    config.httpProxy = {
      '/public': 'http://localhost:8888'
    }
  }
  // add your middleware config here
  config.middleware = [];
  // 静态文件路径
  config.static = {
    dir: [
        path.join(appInfo.baseDir, 'app/public'),
        path.join(appInfo.baseDir, 'dist'),
    ]
  }
  //
  config.security = {
    csrf: {
      enable: false,
    }
  }

  // 配置模版引擎
  config.view = {
    mapping: {
      '.html': 'ejs'
    }
  }

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root123456',
      // 数据库名
      database: 'egg_product',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg_product',
    password: "root123456",
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};

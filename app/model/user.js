'use strict';


module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(30),
    password: STRING(30),
    email: STRING(30),
    phone: STRING(30),
  });

  // User.prototype.associate = function() {
  //   app.model.User.hasMany(app.model.Post, { as: 'posts' });
  // };

  // 数据同步
  // User.sync({ force: true })

  return User;
};

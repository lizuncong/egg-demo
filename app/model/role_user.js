'use strict';


module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const RoleUser = app.model.define('role_user', {
    role_id: {
      type: INTEGER,
      primaryKey: true,
    },
    user_id: {
      type: INTEGER,
      primaryKey: true,
    },
  });

  // RoleUser.sync({ alter: true })


  return RoleUser;
};

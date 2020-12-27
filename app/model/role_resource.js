'use strict';


module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const RoleResource = app.model.define('role_resource', {
    role_id: {
      type: INTEGER,
      primaryKey: true,
    },
    resource_id: {
      type: INTEGER,
      primaryKey: true,
    },
  });

  // RoleResource.sync({ alter: true })

  return RoleResource;
};

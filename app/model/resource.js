'use strict';


module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Resource = app.model.define('resource', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    parent_id: INTEGER,
  });

  // Resource.sync({ alter: true })

  return Resource;
};

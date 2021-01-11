const BaseService = require('./base');


class Service extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = 'roles';
  }

  async getResource() {
    const { app } = this;
    const result = await app.mysql.select('resources');
    const rootMenus = [];
    const map = {};
    result.forEach(res => {
      res.children = [];
      map[res.id] = res;
      if (res.parent_id === 0) {
        rootMenus.push(res);
      } else {
        map[res.parent_id].children.push(res);
      }
    });
    return rootMenus;
  }

  async setResource({ roleId, resourceIds }) {
    const { app } = this;
    const result = await app.mysql.query('DELETE FROM role_resources WHERE role_id=?', [ roleId ]);
    for (let i = 0; i < resourceIds.length; i++) {
      const resourceId = resourceIds[i];
      await app.mysql.insert('role_resources', {
        role_id: roleId,
        resource_id: resourceId,
      });

    }

    return result;
  }

  async getUser() {
    const { app } = this;
    return await app.mysql.select('users');
  }

  async setUser({ roleId, userIds }) {
    const { app } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      await conn.query('DELETE FROM role_users WHERE role_id=?', [ roleId ]);
      for (let i = 0; i < userIds.length; i++) {
        const userId = userIds[i];
        await conn.insert('role_users', {
          role_id: roleId,
          user_id: userId,
        });
      }
      await conn.commit();
    } catch (e) {
      await conn.rollback();
      throw e;
    }
  }
}

module.exports = Service;

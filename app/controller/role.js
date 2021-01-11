const BaseController = require('./base');

class Controller extends BaseController {
  constructor(...args) {
    super(...args);
    this.entity = 'role';
  }

  async getResource() {
    const { service } = this;
    const result = await service[this.entity].getResource();
    this.success(result);
  }

  async setResource() {
    const { ctx, service } = this;
    const body = ctx.request.body; // { roleId: 1, resourceIds: [1,2,3]}
    const result = service[this.entity].setResource(body);
    this.success(result);
  }

  async getUser() {
    const { service } = this;
    const result = await service[this.entity].getUser();
    this.success(result);
  }

  async setUser() {
    const { ctx, service } = this;
    const body = ctx.request.body; // { roleId: 1, userIds: [1,2,3]}
    const result = service[this.entity].setUser(body);
    this.success(result);
  }
}

module.exports = Controller;

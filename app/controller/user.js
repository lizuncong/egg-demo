const { Controller } = require('egg')

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller{
  async index(){
    const { ctx } = this;
    const users = await ctx.service.user.list();
    ctx.body = users;
  }

  async create(){
    const { ctx } = this;
    let user = ctx.request.body;
    const result = await ctx.service.user.create(user);
    ctx.body = {
      code: 0,
      data: 'success',
      ...result
    }
  }

  async update() {
    const ctx = this.ctx;
    const result = await ctx.service.user.update(ctx.params.id, ctx.request.body)
    if (!result) {
      ctx.status = 404;
      return;
    }
    ctx.body = result;
  }
}

module.exports = UserController

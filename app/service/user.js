const { Service } = require('egg')

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserService extends Service{
  async list(){
    // await this.app.mysql.query('select * from user')
    return await this.ctx.model.User.findAll()
  }

  async create(user){
    return await this.ctx.model.User.create(user)
  }

  async update(id, params){
    const {ctx} = this;
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      return;
    }
    return await user.update(params);
  }
}

module.exports = UserService;

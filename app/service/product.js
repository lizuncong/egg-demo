const Service = require('egg').Service;

class ProductService extends Service{
  async create(params){
    const { app } = this;
    try{
      return await app.mysql.insert('product', params);
    } catch (e) {
      console.log('service..product..create.新建商品报错...', e)
      return null;
    }
  }

  async list(){
    const { app } = this;
    try{
      return await app.mysql.select('product');
    } catch (e) {
      console.log('service..product..list.商品列表', e)
      return null;
    }
  }

}

module.exports = ProductService

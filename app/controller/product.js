const Controller = require('egg').Controller
const moment = require('moment');

class ProductController extends Controller{
  async index(){
    const {ctx, app} = this;
    const result = await app.mysql.select('product')
    console.log('result=======', result)
    const res = await ctx.service.product.index();
    // ctx.body = res;
    await ctx.render('index.html', {
      res,
      list: ['a', 'b', 'c']
    })
  }

  async create(){
    const { ctx } = this;
    const data = {
      ...ctx.request.body,
      createTime: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const result = await ctx.service.product.create(data)
    if(result){
      ctx.body = {
        status: 200,
        data: result,
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '创建商品失败'
      }
    }
  }

  async list(){
    const { ctx } = this;
    const result = await ctx.service.product.list();
    if(result){
      ctx.body = {
        status: 200,
        data: result
      }
    } else {
      ctx.body = {
        status: 500,
        errMsg: '查询商品列表失败'
      }
    }

  }

  async detail(){
    const { ctx } = this;
    ctx.body = 'detail' + JSON.stringify(ctx.query);
  }

  async detail2(){
    const {ctx} = this;
    ctx.body = 'detail2' + JSON.stringify(ctx.params)
  }



  async update(){
    const { ctx } = this;
    ctx.body = {
      type: '更新请求',
      ...ctx.params,
    }
  }

  async delete(){
    const { ctx } = this;
    ctx.body = {
      type: '删除请求',
      ...ctx.params
    }
  }
}


module.exports = ProductController;

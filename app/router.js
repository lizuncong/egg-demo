'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/product/list', controller.product.list)
  router.get('/product', controller.product.index)
  router.get('/product/detail', controller.product.detail)
  router.get('/product/:id', controller.product.detail2)
  router.post('/product/create', controller.product.create)
  router.put('/product/update/:id', controller.product.update) // put请求用来修改数据
  router.delete('/product/delete/:id', controller.product.delete)
  /******************************用户相关路由 start**************************************/
  router.resources('user', '/api/user', controller.user)
  /******************************用户相关路由 end****************************************/
};

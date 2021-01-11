'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/product/list', controller.product.list);
  router.get('/product', controller.product.index);
  router.get('/product/detail', controller.product.detail);
  router.get('/product/:id', controller.product.detail2);
  router.post('/product/create', controller.product.create);
  router.put('/product/update/:id', controller.product.update); // put请求用来修改数据
  router.delete('/product/delete/:id', controller.product.delete);
  /** ****************************用户相关路由**************************************/
  router.resources('user', '/api/user', controller.user);

  /** ****************************角色相关路由**************************************/
  // router.get('/api/role/getResource', controller.role.getResource)
  router.post('/api/role/setResource', controller.role.setResource);
  router.get('/api/role/getUser', controller.role.getUser);
  router.post('/api/role/setUser', controller.role.setUser);

  router.resources('role', '/api/role', controller.role);
  router.get('/api/role/getResource', controller.role.getResource);

  /** ****************************角色_用户相关路由**************************************/
  router.resources('roleUser', '/api/roleUser', controller.roleUser);

  /** ****************************角色_资源相关路由**************************************/
  router.resources('roleResource', '/api/roleResource', controller.roleResource);

  /** ****************************资源相关路由**************************************/
  router.resources('resource', '/api/resource', controller.resource);

  router.get('*', controller.serverRender.render);
};

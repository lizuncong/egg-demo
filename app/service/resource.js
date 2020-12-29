const BaseService = require('./base')


class Service extends BaseService{
  constructor(...args){
    super(...args);
    this.entity = 'resources'
  }
}

module.exports = Service;

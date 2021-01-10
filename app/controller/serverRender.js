const { Controller } = require('egg/index')
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const ReactSSR = require('react-dom/server');
const webpack = require('webpack');
const serverConfig = require('../../react-ssr/build/webpack.config.server');
const MemoryFs = require('memory-fs');

const isDev = process.env.NODE_ENV === 'development'

const Module = module.constructor;
let serverBundle;
const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs;
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
  if(err) throw err;
  stats = stats.toJson();
  stats.errors.forEach(err => console.error(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
      serverConfig.output.path,
      serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8');
  const m = new Module;
  m._compile(bundle, 'server-entry.js');
  serverBundle = m.exports.default;
})
const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html').then(res => {
      resolve(res.data)
    }).catch(reject)
  })
}

class Index extends Controller{
  async devStatic(){
    // 开发环境中，html，serverEntry是存在于memory中的。
    const { ctx } = this;
    const template = await getTemplate();
    const content = ReactSSR.renderToString(serverBundle)
    const html = template.replace('<app></app>', content)
    ctx.body = html;
  }

  async render(){
    const { ctx } = this;
    let template = '';
    let serverEntry = '';
    if(!isDev){
      console.log('isDev+++++++', isDev)
      template = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf8')
      serverEntry = require('../../dist/server-entry').default;
      const appString = ReactSSR.renderToString(serverEntry);
      console.log('ctx.url', ctx.url)
      console.log('appString====', appString)
      const html = template.replace('<app></app>', appString)
      ctx.body = html;
    } else {
      await this.devStatic();
    }
  }
}

module.exports = Index

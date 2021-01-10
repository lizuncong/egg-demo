# demo



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


### 服务端渲染部分

#### 服务端渲染思路
- 生产环境思路
    + 运行npm run build:react-client打包客户端程序，此时会在dist目录下生成客户端的bundle及html文件
    + 运行npm run build:react-server打包服务端程序，此时会在dist目录下生成服务端的bundle
    + npm run dev启动服务端。服务端会读取dist目录下的serverEntry脚本及html文件

- 开发环境思路
    + 首先运行npm run dev:react-client打包客户端程序。此时客户端脚本及html文件均在内存中。
    + npm run dev启动服务端。服务端需要从内存中读取客户端生成的html文件。
    + 本地开发时， 由于客户端的脚本是生成在内存中的，因此需要在服务端将请求的静态文件代理到webpack-dev-server中。这里使用
    egg-http-proxy



#### 生产环境运行
- 1.首先运行npm run build:react
    + 此时会先运行npm run build:react-client 打包客户端程序
    + 再执行npm run build:react-server 打包服务端程序
- 2.运行npm run dev启动服务端

#### 开发环境运行
- 1.首先运行npm run dev:react-client打包客户端程序
- 2.运行npm run dev启动服务端

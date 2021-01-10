const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/index.jsx')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../../dist'),
    publicPath: "/public/"
  },
  module: {
    rules: [
      {
        test: /.(jsx?)$/,
        loader: 'babel-loader',
        exclude: /[\\/]node_modules[\\/]/,
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                // useBuiltIns: isClient ? 'usage' : undefined,
                // corejs: isClient ? 3 : false,
                // targets,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [].filter(Boolean),
        },
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, '../client/template.html')
      })
  ]
}

if(isDev){
  config.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../dist'),
    // hot: true,
    overlay: {
      errors: true
    },
    publicPath: '/public/',
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
}

module.exports = config

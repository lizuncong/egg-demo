const path = require('path');

module.exports = {
  target: 'node',
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../server/index.jsx'),
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../../dist'),
    // publicPath: "/public",
    libraryTarget: 'commonjs2',
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
      },
    ],
  },
  plugins: [],
};

// Look in ./config folder for webpack.dev.js
var webpack = require('webpack');
new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
});
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    module.exports = require('./config/webpack.prod')({env: 'production'});
    break;
  case 'dev':
  case 'development':
  default:
    module.exports = require('./config/webpack.prod')({env: 'production'});
}

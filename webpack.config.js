module.exports = {
  entry: './frontsrc/main.js',
  devtool: 'sourcemap',
  output: {
    filename: './public/js/main.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js']
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.js$/, exclude: /(node_modules|vendor)/, loader: 'babel-loader' }
    ]
  }
};

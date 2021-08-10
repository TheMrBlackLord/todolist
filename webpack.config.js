const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path')

module.exports = {
   entry: [
      'babel-polyfill',
      path.resolve(__dirname, './static', 'app.js')
   ],
   stats: 'minimal',
   devtool: false,
   module: {
      rules: [{
            test: /\.js$/,
            use: 'babel-loader'
         },
         {
            test: /\.vue$/,
            use: 'vue-loader'
         },
         {
            test: /\.css$/,
            use: ['vue-style-loader', 'css-loader']
         },
         {
            test: /\.s[ac]ss$/i,
            use: [
               "style-loader",
               "css-loader",
               "sass-loader",
            ],
         },
      ]
   },
   output: {
      path: path.resolve(__dirname, 'client'),
      filename: "app.js",
      clean: true
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './static/index.html',
      }),
      new VueLoaderPlugin(),
   ]
};
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    hot: false,
    liveReload: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jpe?g|webp|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext][query]',
        },
      },
    ],
  },

  plugins:[
    /* new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),*/
    new HtmlBundlerPlugin({
      
      // - OR - define pages with variables
      entry: [
        {
          import: 'src/views/pages/home/home.hbs', // template file
          filename: 'index.html', // => dist/index.html
          data: 'src/views/pages/home/home.json' // pass variables into template
        },
        {
          import: 'src/views/pages/about/about.hbs', // template file
          filename: 'about.html', // => dist/index.html
          data: 'src/views/pages/about/about.json' // pass variables into template
        },
      ],

      preprocessor: 'handlebars',
      // define handlebars options
      preprocessorOptions: {
        partials: ['src/views/partials'],
        helpers: {
          arraySize: (array) => array.length,
        },
      },

      js: {
        // JS output filename, used if `inline` option is false (defaults)
        filename: 'js/[name].[contenthash:8].js',
        //inline: true, // inlines JS into HTML
      },
      css: {
        // CSS output filename, used if `inline` option is false (defaults)
        filename: 'css/[name].[contenthash:8].css',
        //inline: true, // inlines CSS into HTML
      },
    }),
  ]

};
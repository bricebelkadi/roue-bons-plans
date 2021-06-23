// Require of all plugins
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


// const generateHtmlPlugin = (title) => {
//   return new HtmlWebpackPlugin({
//     title,
//     filename: `${title.toLowerCase()}.html`,
//     template: `./src/html/${title.toLowerCase()}.html`,
//   });
// }

// const populateHtmlPlugins = (pagesArray) => {
//   res = [];
//   pagesArray.forEach(page => {
//     res.push(generateHtmlPlugin(page));
//   })
//   return res;
// }

// const pages = populateHtmlPlugins(["index", "admin"]);



module.exports = {
  entry: {
    index: "./src/script/index.js",
    admin: "./src/script/admin.js",
  },
  devtool: "source-map",
  resolve: {
    modules: [
      path.resolve(__dirname), 'node_modules'
    ]
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtimechunk~${entrypoint.name}`,
    },
  },
  output: {
    path: path.join(__dirname, "/dist"),
    filename: '[name].js',
  },

  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({      // Instancie le plugin
      filename: "index.html",
      inject: true,
      template: "./src/html/index.html",  // Spécifie notre template
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({      // Instancie le plugin
      filename: "admin.html",
      title: "Admin Page",
      inject: true,
      template: "src/html/admin.html",  // Spécifie notre template
      chunks: ["admin"]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  }
}
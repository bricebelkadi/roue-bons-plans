const path = require("path")

// Require the new plugin
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/script/index.js",
    devtool: "source-map",
    resolve: {
        modules: [
            path.resolve(__dirname), 'node_modules'
        ]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.ts?$/,
    //             loader: "awesome-typescript-loader"
    //         }
    //     ]
    // },
    plugins: [
        new HtmlWebpackPlugin({      // Instancie le plugin
            template: "./src/index.html"  // Spécifie notre template
        })
    ]
}
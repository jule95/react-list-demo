const combineLoaders = require('webpack-combine-loaders');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
    //defines entry (main js file) and bundled output point
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        filename: "bundle.js"
    },
    //make code errors point to entry files rather than bundled files
    devtool: "eval-source-map",
    module: {
        rules: [
            {
                //define which files to transform
                test: /\.(js|jsx)$/,
                //exclude certain files from transformation
                exclude: /node_modules/,
                //indicate which loader to use
                use: ["babel-loader"]
            },
            {
                //define which files to transform, defined via regex (files which end with .html)
                test: /\.html$/,
                //indicate which loader to use
                use: [{
                    //loader which can take html markup (webpack understands js and json by default)
                    loader: "html-loader",
                    //specify weather to transform markup to one single line
                    options: {minimize: true}
                }]
            },
            {
                //define which files to transform, defined via regex (files which end with .css)
                test: /\.css$/,
                //loader which can take css styling (webpack understands js and json by default)
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                //define which file to expose to global scope
                test: require.resolve('jquery'),
                //define expose loader and expose jquery to $ namespace
                use: [{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            //entry file
            template: "./public/index.html",
        }),
        new MiniCssExtractPlugin({
            //output file
            filename: "bundle.css",
        }),
        new webpack.ProvidePlugin({
            //load jquery
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
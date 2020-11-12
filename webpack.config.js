var HTMLWebpackPlugin = require('html-webpack-plugin');
var CSSWebPackPlugin = require('css-loader');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname+'/app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: __dirname+'/app/index.js',
    module: {
        rules: [
            { 
            test: /\.js$/,
            exclude: '/node_modules/',
            loader: 'babel-loader'
            },
            { test: /\\.css$/, use: [ {
                loader: 'css-loader',
                options: {
                  modules: true
                }
                }
               ]
            }
        ]
    },
    output: {
        filename: 'transformed.js',
        path: __dirname+'/build/'
    },
    plugins: [HTMLWebpackPluginConfig]
};
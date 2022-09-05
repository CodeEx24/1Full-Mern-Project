const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        myApp: './src/index.js'
    },
    module: {
        rules: [
            {test: /\.(js|jsx)$/, test: ['babel-loader']}
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Chart Generator',
            template: './src/template.ejs',
            filename: 'index.html'
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'public'),
        publicPath: '/'
    }
}
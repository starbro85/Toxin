const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 

const config = {
    context: path.resolve(__dirname, '..', 'src'),
    entry: './main.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                      pretty: true
                    }
                },
            },
            {
                test: /\.(ico|png|jpg|svg|gif|ttf|eot|woff|woff2|xml|webmanifest)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'start-page',
            filename: 'start-page.html',
            template: '../src/pages/start-page/start-page.pug',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackPlugin({
            title: 'form-elements',
            filename: 'form-elements.html',
            template: '../src/pages/form-elements/form-elements.pug',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHardDiskPlugin(),
    ],
    devServer: {
        inline: true,
        hot: true,
        contentBase: 'dist',
        port: 8800,
    }
};

module.exports = config;
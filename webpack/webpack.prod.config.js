const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');


const config = {
    context: path.resolve(__dirname, '..', 'src'),
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    entry: './main.js',
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '..', 'dist'),
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['ru'],
        }),
        new HtmlWebpackPlugin({
            title: 'start-page',
            filename: 'start-page.html',
            template: '../src/pages/start-page/start-page.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'cards',
            filename: 'cards.html',
            template: '../src/pages/cards/cards.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'form-elements',
            filename: 'form-elements.html',
            template: '../src/pages/form-elements/form-elements.pug',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        })
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    autoprefixer({ overrideBrowserslist: ['last 2 versions'] }),
                                ];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: 'pug-loader',
                        options: {
                            pretty: false
                        }
                    }]
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.(ico|png|jpg|svg|gif)$/,
                loader: 'file-loader',
                exclude: [
                    /fonts/,
                ],
                options: {
                    name: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(svg|ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                exclude: [
                    /node_modules/,
                    /img/,
                ],
                options: {
                    name: 'fonts/[name]/[name].[ext]',
                    prefix: 'font'
                }
            },
        ]
    }
}

module.exports = config;
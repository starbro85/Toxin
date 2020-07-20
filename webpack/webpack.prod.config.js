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
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MomentLocalesPlugin({
            localesToKeep: ['ru', 'en']
        }),
        new HtmlWebpackPlugin({
            title: 'start-menu',
            filename: 'start-menu.html',
            template: '../src/pages/start-menu/start-menu.pug',
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
        new HtmlWebpackPlugin({
            title: 'headers-and-footers',
            filename: 'headers-and-footers.html',
            template: '../src/pages/headers-and-footers/headers-and-footers.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'landing-page',
            filename: 'landing-page.html',
            template: '../src/pages/landing-page/landing-page.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'search-room',
            filename: 'search-room.html',
            template: '../src/pages/search-room/search-room.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'room-detail',
            filename: 'room-detail.html',
            template: '../src/pages/room-detail/room-detail.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'registration-page',
            filename: 'registration-page.html',
            template: '../src/pages/registration-page/registration-page.pug',
        }),
        new HtmlWebpackPlugin({
            title: 'login-page',
            filename: 'login-page.html',
            template: '../src/pages/login-page/login-page.pug',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        })
    ],
}

module.exports = config;
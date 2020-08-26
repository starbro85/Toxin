const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

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
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    { 
                        loader: 'css-loader', 
                        options: { 
                            importLoaders: 1 
                        } 
                    },
                    { 
                        loader: 'postcss-loader', 
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv({
                                    stage: 3,
                                    features: {
                                        'nesting-rules': true,
                                        'not-pseudo-class': true
                                    },
                                    browsers: 'last 2 versions'
                                })
                            ]
                        }
                    }
                ],
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
                    /pixel-perfect/
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
                    /img/
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
        new HtmlWebpackPlugin({
            title: 'start-menu',
            filename: 'start-menu.html',
            template: '../src/pages/start-menu/start-menu.pug',
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
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
        })
    ],
}

module.exports = config;
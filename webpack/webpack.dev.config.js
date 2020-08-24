const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHardDiskPlugin = require('html-webpack-harddisk-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const postcssPresetEnv = require('postcss-preset-env');

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
                test: /\.pug$/,
                use: {
                    loader: 'pug-loader',
                    options: {
                      pretty: true
                    }
                },
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: [/node_modules/],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
                ]
            },
            {
                test: /\.(ico|svg|jpg|png|gif|ttf|eot|woff|woff2|xml|webmanifest)$/,
                loader: 'file-loader?name=[path][name].[ext]'
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'search-room',
            filename: 'search-room.html',
            template: '../src/pages/search-room/search-room.pug',
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackPlugin({
            title: 'room-detail',
            filename: 'room-detail.html',
            template: '../src/pages/room-detail/room-detail.pug',
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
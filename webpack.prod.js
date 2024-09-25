const loader = require("html-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin")
const Terser = require("terser-webpack-plugin");
const { sources } = require("webpack");

module.exports ={

    mode: 'production',
    module:{
        rules:[
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options:{
                    sources: false,
                },
            },
            {
                test:/\.css$/,
                use:[MiniCssExtract.loader,'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
            }
        ],
    },
    
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            title: 'Webpack app',
        }),
        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                {from:'src/assets', to:'assets/'}
            ]
        }),
    ]
},
    {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use:{
            loader: "babel-loader",
            options:{
                presets:['@babel/preset-env']
            }
        }
        
    }
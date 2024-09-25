const loader = require("html-loader")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { sources } = require("webpack")

module.exports ={

    mode: 'development',
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
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './index.html',
            title: 'Webpack app',
        }),
        new MiniCssExtract({
            filename: 'style-css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns:[
                {from:'src/assets', to:'assets/'}
            ]
        }),
    ]
}
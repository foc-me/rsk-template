const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

const { DefinePlugin } = webpack

module.exports = {
    entry: {
        react: ["react", "react-dom", "react-router-dom"],
        util: ["axios"],
        index: {
            import: path.resolve(__dirname, "../src/view/index.tsx"),
            dependOn: ["react", "util"]
        }
    },
    output: {
        publicPath: "/",
        path: path.resolve(__dirname, "../dist"),
        filename: "assets/lib/[name].js",
        chunkFilename: "assets/lib/[name].js"
    },
    module: {
        rules: [
            {
                test: /.js$/,
                use: ["babel-loader"]
            },
            {
                test: /.tsx?$/,
                use: ["babel-loader"]
            },
            {
                test: /.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "global"
                            }
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: "single"
    },
    plugins: [
        new DefinePlugin({ __SSR__: JSON.stringify(true) }),
        new MiniCssExtractPlugin({
            filename: "assets/style/[name].css",
            linkType: "text/css"
        }),
        new CssMinimizerWebpackPlugin()
    ]
}
const webpack = require("webpack")
const { merge } = require("webpack-merge")
const webpackDevServer = require("webpack-dev-server")
const createArgv = require("@focme/argv")
const { BuildType, makeEnv } = require("./base")
const base = require("../webpack/base.config")
const config = require("../webpack/spa.start")

function makeServer() {
    return {
        port: 8081,
        hot: true,
        historyApiFallback: true,
        open: {
            target: "/",
            app: { name: "Google Chrome" }
        }
    }
}

async function main() {
    const options = createArgv().opt()
    makeEnv(BuildType.spa, options)

    const { __MODE__ } = process.env
    const mode = { mode: __MODE__ }
    const compiler = webpack(merge(base, mode, config))
    const server = new webpackDevServer(makeServer(), compiler)
    await server.start()
}

main()
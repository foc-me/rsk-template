const path = require("path")

module.exports = {
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".css"],
        alias: {
            "assets": path.resolve(__dirname, "../assets"),
            "controller": path.resolve(__dirname, "../src/controller"),
            "module": path.resolve(__dirname, "../src/module")
        }
    }
}
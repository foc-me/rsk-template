const typescript = require("@rollup/plugin-typescript")
const terser = require("@rollup/plugin-terser")
const copy = require("rollup-plugin-copy")
const pick = require("@focme/rollup-plugin-pick")

module.exports = {
    input: "./lib/index.ts",
    output: [
        { dir: "./dist/esm", format: "esm" },
        // should change the name "rsk-lib"
        { dir: "./dist/dist", format: "umd", name: "rsk-lib" }
    ],
    plugins: [
        typescript({
            outDir: null,
            declaration: false,
            declarationDir: null
        }),
        terser(),
        copy({
            targets: [
                { src: ["./readme.md"], dest: "./dist" }
            ]
        }),
        pick([
            "name",
            "version",
            ["main", "dist/index.js"],
            ["module", "esm/index.js"],
            ["types", "type"],
            "description",
            "keywords",
            ["files", ["dist", "esm", "lib", "type", "readme.md", "package.json"]],
            "author",
            "repository",
            "license"
        ])
    ]
}
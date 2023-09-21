import path from "node:path"
import fs from "node:fs"
import type { Context } from "koa"
import mime from "mime"

const cwd = process.cwd()
const dist = path.join(cwd, "dist")

function makeUrl(url: string) {
    return url.split("?")[0]
}

function makePath(url: string) {
    for (const item of [cwd, dist]) {
        const filePath = path.join(item, makeUrl(url))
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            return filePath
        }
    }
}

async function controller(ctx: Context) {
    const { originalUrl } = ctx
    const filePath = makePath(originalUrl)
    if (filePath) {
        const mimeType = mime.getType(path.extname(filePath))
        if (mimeType) {
            ctx.response.set("content-type", mimeType)
            ctx.body = fs.createReadStream(filePath)
        }
    }
}

export default [
    { path: "/assets/(.*)", controller, name: "assets" }
] as Route[]
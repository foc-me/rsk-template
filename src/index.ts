import Koa from "koa"
import KoaRouter from "@koa/router"
import cors from "@koa/cors"
import timeout from "utils/timeout"
import print from "utils/print"
import contoller from "./controller"
import { respond } from "./service"

function makeExit(callback?: () => void) {
    process.stdin.resume()
    const duration = timeout()
    process.on("exit", (code) => {
        if (callback) callback()
        print.time(`receive exit code "${code}"`)
        print.success.time(`process stop after ${duration()}`)
    })
    const processEvents = ["SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException"]
    processEvents.forEach(eventType => {
        process.on(eventType, (event) => {
            print.bg.error.time(`${eventType}:`)
            print.bg.error.time(event)
            if (typeof event !== "string") console.log(event)
            process.exit()
        })
    })
}

function main() {
    const app = new Koa()
    const router = new KoaRouter()
    contoller.apply(router)
    app.use(respond(router))
    app.use(cors())
    app.use(router.routes())
    app.use(router.allowedMethods())

    makeExit()

    app.listen(__PORT__)
    print.time(`now service on port ${__PORT__}`)
}

main()
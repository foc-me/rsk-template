import dayjs from "dayjs"
import color from "./color"

export interface PrintFunction {
    (target: any): void
    time: (target: any) => void
}

function log(style: string, target: any, reset?: string) {
    console.log(style, target, reset || color.reset)
}

function logTimestamp(style: string, target: any, reset?: string) {
    const now = dayjs().format("YYYY-MM-DD HH:mm:ss:SSS")
    console.log(style, `[${now}] ${target}`, reset || color.reset)
}

export function buildPrint(color: string): PrintFunction {
    const print = (target: any) => {
        log(color, target)
    }
    print.time = (target: any) => {
        logTimestamp(color, target)
    }
    return print
}
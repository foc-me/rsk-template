import { type PrintFunction, buildPrint } from "./print"
import color from "./color"

interface Print extends PrintFunction {
    color: typeof color,
    error: PrintFunction
    success: PrintFunction
    warning: PrintFunction
    bg: {
        error: PrintFunction
        success: PrintFunction
        warning: PrintFunction
    }
}

const print = buildPrint(color.reset) as Print
print.color = color
print.error = buildPrint(color.fg.red)
print.success = buildPrint(color.fg.green)
print.warning = buildPrint(color.fg.yellow)
print.bg = {
    error: buildPrint(color.bg.red),
    success: buildPrint(color.bg.green),
    warning: buildPrint(color.bg.yellow)
}

export default print
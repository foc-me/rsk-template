import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"

dayjs.extend(duration)

function timeout() {
    let start = new Date().getTime()
    return (format = "YYYY-MM-DD HH:mm:ss:SSS") => {
        const current = new Date().getTime()
        const duration = dayjs.duration(current - start)
        start = current
        return duration.format(format)
    }
}

export default timeout
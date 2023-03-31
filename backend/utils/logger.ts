const info = (...params: string[]) => {
    console.log(...params)
}

const error = (...params: string[]) => {
    console.error(...params)
}

const logger = {
    info, error
}

export default logger
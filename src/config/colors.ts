import colors from 'colors'

export class Colors {
    static blueBold(message: string) {
        return colors.blue.bold(message)
    }

    static cyan(message: string) {
        return colors.cyan(message)
    }

    static cyanBold(message: string) {
        return  colors.cyan.bold(message)
    }

    static green(message: string) {
        return  colors.green(message)
    }

    static red(message: string) {
        return  colors.red(message)
    }

    static redBold(message: string) {
        return  colors.red.bold(message)
    }

    static yellow(message: string) {
        return  colors.yellow(message)
    }
}
import colors from 'colors'

export class Colors {
    static blueBold(message: string) {
        colors.blue.bold(message)
    }

    static cyan(message: string) {
        colors.cyan(message)
    }

    static cyanBold(message: string) {
        colors.cyan.bold(message)
    }

    static green(message: string) {
        colors.green(message)
    }

    static red(message: string) {
        colors.red(message)
    }

    static redBold(message: string) {
        colors.red.bold(message)
    }

    static yellow(message: string) {
        colors.yellow(message)
    }
}
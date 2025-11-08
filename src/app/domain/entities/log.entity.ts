
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}


export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date
    origin: string
}


export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date
    public origin: string


    constructor(options: LogEntityOptions) {
        const { level, message, origin, createdAt = new Date() } = options
        this.createdAt = createdAt
        this.level = level;
        this.message = message;
        this.origin = origin
    }

    static fromJson = (json: string): LogEntity => {
        json = (json === '') ? '{}': json;

        const { message, level, createdAt, origin } = JSON.parse(json);

        if (!message) throw new Error('Message is required');
        if (!level) throw new Error('Level is required');
        if (!createdAt) throw new Error('CratedAt is required');


        const log = new LogEntity({ message, level, createdAt, origin });
        log.createdAt = createdAt;
        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, createdAt, origin } = object;

        if (!message) throw new Error('Message is required');
        const log = new LogEntity({ message, level, createdAt, origin });
        return log;
    }

}
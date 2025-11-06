
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high'
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date

    constructor(message: string, level: LogSeverityLevel) {
        this.createdAt = new Date();
        this.level = level;
        this.message = message;
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt } = JSON.parse(json);
        
        if(!message) throw new Error('Message is required');
        if(!level) throw new Error('Level is required');
        if(!createdAt) throw new Error('CratedAt is required');

        const log = new LogEntity(message, level);
        log.createdAt = createdAt;
        return log;

    }

}
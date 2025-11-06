import fs from "fs";

import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class FileSystemDataSourceImpl implements LogDatasource {

    private readonly logPath = 'logs';
    private readonly allLogsPath = 'logs/logs-low.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() { this.createLogsFiles() }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath, { recursive: true });
        }

        const paths = [this.allLogsPath, this.mediumLogsPath, this.highLogsPath]

        paths.forEach(file => {
            if (fs.existsSync(file)) return;

            fs.writeFileSync(file, '', 'utf-8');
        });
    }

    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJSON = JSON.stringify(newLog);
        fs.appendFileSync(this.allLogsPath, logAsJSON);

        if (newLog.level === LogSeverityLevel.low) return;

        if (newLog.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.mediumLogsPath, logAsJSON);
            return
        }

        fs.appendFileSync(this.highLogsPath, logAsJSON);
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').map(log => LogEntity.fromJson(log));

        return logs
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);
            default:
                throw new Error('Invalid severity level');

        }
    }

}
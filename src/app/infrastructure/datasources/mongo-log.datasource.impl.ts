import { Colors } from "../../../config/colors";
import { LogModel } from "../../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


export class MongoLogDatasource implements LogDatasource {

    async saveLog(newLog: LogEntity): Promise<void> {
        const log = await LogModel.create(newLog);
        console.log(Colors.green('Mongo Log created'));
    }

    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const allLogs = await LogModel.find({
            level: severityLevel
        })

        const logsEntities = allLogs.map(log => LogEntity.fromObject(log))

        return logsEntities
    }

}
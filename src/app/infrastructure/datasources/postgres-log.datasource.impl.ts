import { PrismaClient, SeverityLevel } from "../../../generated/prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}

export class PostgresLogDatasource implements LogDatasource {

    async saveLog(newLog: LogEntity): Promise<void> {
        const { level, message, createdAt, origin, } = newLog
        const prismaLevel = severityEnum[level];

        const newLogPrisma = await prisma.logModel.create({
            data: {
                level: prismaLevel,
                message,
                createdAt,
                origin
            }
        })
    }


    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const prismaLevel = severityEnum[severityLevel];

        const allLogs = await prisma.logModel.findMany<object>({
            where: {
                level: prismaLevel
            }
        })

       return allLogs.map(LogEntity.fromObject)

        //return logsEntities
    }

}
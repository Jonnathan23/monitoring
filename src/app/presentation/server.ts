import { CheckService } from "../domain/use-cases/checks/check-service.use";
import { FileSystemDataSourceImpl } from "../infrastructure/datasources/file-system.datasource.impl";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource.impl";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource.impl";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./service/cron/cron.service";
import { EmailService } from "./service/email/email.service";

const logRepository = new LogRepositoryImpl(
    //new FileSystemDataSourceImpl()
    //new MongoLogDatasource()
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started');

        CronService.createJob(
            "*/5 * * * * * ",
            () => {
                const checkService = new CheckService({
                    logRepository: logRepository,
                    succesCallback: () => console.log(`success on check service`),
                    errorCallback: (error) => console.log(error)
                })

                checkService.execute('https://google.com');
                //new CheckService().execute('http://localhost:3000');
            });

    }
}
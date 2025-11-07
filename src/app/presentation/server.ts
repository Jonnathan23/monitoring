import { CheckService } from "../domain/use-cases/checks/check-service.case";
import { FileSystemDataSourceImpl } from "../infrastructure/datasources/file-system.datasource.impl";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./service/cron/cron.service"
import { EmailService } from "./service/email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSourceImpl()
);


export class Server {

    public static start() {
        console.log('Server started');

        // Mandar Email 
        const emailService = new EmailService();
       // emailService.sendEmailWithFileSystemLogs(['jonnaferna@gmail.com', 'jonnasaquicela@gmail.com']);



        //CronService.createJob(
        //    "*/5 * * * * * ",
        //    () => {
        //        const checkService = new CheckService({
        //            logRepository: fileSystemLogRepository,
        //            succesCallback: undefined,//() => console.log(`success on check service`),
        //            errorCallback: (error) => console.log(error)
        //        })
        //
        //        checkService.execute('https://google.com');
        //        //new CheckService().execute('http://localhost:3000');
        //    });


    }
}
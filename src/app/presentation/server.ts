import { CheckService } from "../domain/use-cases/checks/check-service.use";
import { SendEmailLogs } from "../domain/use-cases/emails/send-email-logs.use";
import { FileSystemDataSourceImpl } from "../infrastructure/datasources/file-system.datasource.impl";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./service/cron/cron.service"
import { EmailService } from "./service/email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSourceImpl()
);

const emailService = new EmailService();

export class Server {

    public static start() {
        console.log('Server started');

        // Mandar Email 
        const sendEmailUseCase = new SendEmailLogs(emailService, fileSystemLogRepository);
        sendEmailUseCase.execute(['jonnaferna@gmail.com', 'jonnasaquicela@gmail.com']);

        // emailService.sendEmailWithFileSystemLogs(['jonnaferna@gmail.com', 'jonnasaquicela@gmail.com']);
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
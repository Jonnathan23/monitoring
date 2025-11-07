import { SendMailOptions } from "nodemailer";
import { EmailService } from "../../../presentation/service/email/email.service";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

interface SendLogEmailUseCase {
    execute(to: string | string[]): Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) { }

    async execute(to: string | string[]): Promise<boolean> {

        try {
            const sent = await this.emailService.sendEmailWithFileSystemLogs(to);

            if (!sent) throw new Error('Email was not sent');
            
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email sent to ${to}`,
                origin: 'send-email.use.ts'
            })

            this.logRepository.saveLog(log);
            return true;
        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: `Email was not sent to ${to}`,
                origin: 'send-email.use.ts'
            })

            this.logRepository.saveLog(log);

            return false;
        }

    }

}
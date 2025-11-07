import nodemailer from "nodemailer";
import { envs } from "../../../../config/plugins/envs.plugings";
import { LogRepository } from "../../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../../domain/entities/log.entity";

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attatchement[]
}

interface Attatchement {
    filename: string;
    path: string;
}

export class EmailService {


    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })


    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
                attachments
            });          

            return true
        } catch (error) {
           
            return false
        }
    }

    async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {

        const subject = 'Logs de sistema - NOC';
        const htmlBody = `
            <h3>Logs de sistema - NOC</h3>
            <p> LogRepositoryImpl </p>
            <p> Ver los logs adjuntos</p>
            `;
        const attachments: Attatchement[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' }
        ];

        console.log('sendEmailWithFileSystemLogs');
        return this.sendEmail({ to, subject, htmlBody, attachments });
    }
}
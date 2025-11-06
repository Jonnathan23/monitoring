import { CronService } from "./service/cron-service"

export class Server {

    public static start() {
        console.log('Server started')

        CronService.createJob("*/5 * * * * *", () => {
            const date = new Date();
            console.log('Cron job is running each 5 seconds', date);
        });


    }
}
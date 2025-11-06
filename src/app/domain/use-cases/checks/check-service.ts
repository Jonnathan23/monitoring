import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccesCallBack = (() => void) | undefined
type ErrorCallBack = ((error: string) => void) | undefined


interface CheckServiceProps {
    logRepository: LogRepository,
    succesCallback: SuccesCallBack,
    errorCallback: ErrorCallBack
}

export class CheckService implements CheckServiceUseCase {

    private readonly logRepository: LogRepository;
    private readonly succesCallback: SuccesCallBack;
    private readonly errorCallback: ErrorCallBack;

    constructor({ logRepository, succesCallback, errorCallback }: CheckServiceProps) {
        this.logRepository = logRepository;
        this.succesCallback = succesCallback;
        this.errorCallback = errorCallback
    }


    public async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(`Success on check service ${url}`, LogSeverityLevel.low);

            this.logRepository.saveLog(log);
            this.succesCallback && this.succesCallback();

            return true
        } catch (error) {

            const errorMessage = `${error}`;

            const log = new LogEntity(errorMessage, LogSeverityLevel.high);
            this.logRepository.saveLog(log);

            this.errorCallback && this.errorCallback(errorMessage)

            return false
        }
    };
}
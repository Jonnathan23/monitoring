import { Server } from "./app/presentation/server"
import { envs } from "./config/plugins/envs.plugings"


(async () => {
    main()
})()


function main() {
    //Server.start()
    console.log(envs);
}
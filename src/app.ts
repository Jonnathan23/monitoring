import { Server } from "./app/presentation/server"
import { envs } from "./config/plugins/envs.plugings"
import { MongoDatabase } from "./data/mongo"
import { PrismaClient } from "./generated/prisma/client"


(async () => {
    main()
})()


async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })


    const prisma = new PrismaClient()
    await prisma.$connect()


    Server.start()
}
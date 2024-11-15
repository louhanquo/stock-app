//due to prisma does not support the edge this is integration configuration for nextJs
import { PrismaClient } from "@prisma/client";

declare global{
    var prisma: PrismaClient | undefined
}


//db is now the prisma client so for prisma function we can do db.companyData.create{where: {id}}
export const db = globalThis.prisma || new PrismaClient()

//if the process of the prisma is not production, do not make another prisma client for better user experience 
if(process.env.NODE_ENV !== "production") globalThis.prisma = db;
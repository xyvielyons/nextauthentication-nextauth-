import {PrismaClient} from "@prisma/client"

declare global {
    var prisma:PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()//because global this is not affected by hot reloading
//when prisma starts it will not start a new instance of prisma everytime

if(process.env.NODE_ENV !== "production") globalThis.prisma = db
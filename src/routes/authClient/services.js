import {prisma} from "../../plugins/db.js"

export class Auth{
    constructor(fastify){}

    async createNewSection(clientData){
        if(!clientData) return 0
        return await prisma.client.findFirst({where:{
            cedula:clientData.c_i,
            contraseña:clientData.password
        }})
    }
}
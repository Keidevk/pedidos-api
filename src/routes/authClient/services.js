import {prisma} from "../../plugins/db.js"

export class Auth{
    constructor(fastify){}

    async createNewSection(clientData){
        if(!clientData) return 0
        return await prisma.client.findFirst({where:{
            Cedula:clientData.c_i,
            Contraseña:clientData.password
        }})
    }
}
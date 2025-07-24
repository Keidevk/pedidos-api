import { verifyPassword } from "../../plugins/crypt.js"
import {prisma} from "../../plugins/db.js"

export class Auth{
    constructor(fastify){}

    async createNewSection(clientData){
        if(!clientData) return 0
        const data = await prisma.user.findFirst({where:{
            email:clientData.email,
        }})

        if (data) {
            const verify = await verifyPassword(clientData.password,data.contraseña)
            if(verify){ 
              return { 
                    message: 'logged', 
                    code: 200,
                    token: 'true',
                    name:data.nombre + " " + data.apellido,
                    tipo:data.tipo, 
                    userId:data.id
                }
            }else{
                return {
                    message:'not logged',
                    code:403,
                    token:'false',
                }
            }
        }
    }
}
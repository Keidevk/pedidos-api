import { hash } from "crypto";
import { prisma } from "../../plugins/db.js";
import { hashPassword, verifyPassword } from "../../plugins/crypt.js";

export class RegisterClient {
  constructor(fastify) {}

  async createClient(clientData) {
    const Password = await hashPassword(clientData.password)
    const data = await prisma.user.findFirst({
    where: {
      email: clientData.email
    },
  });


    if (data) {
      const verify = verifyPassword(clientData.password,data.contraseña)
      if(verify){ 
        return {
          code: 409, 
          message: 'El usuario ya existe',
        };
      }
    }
    // const address = clientData.address
    const newUser = await prisma.user.create({data:{
        nombre:clientData.name,
        apellido:clientData.lastname,
        telefono:clientData.phone,
        email:clientData.email,
        contraseña:Password,
        tipo:'cliente',
        fechaRegistro:new Date(),
        activo:true,
        fotoPerfil:"",
        direccion:JSON.stringify(clientData.address),
        documento_identidad:clientData.c_i
      }})

    await prisma.cliente.create({data:{
      userId:newUser.id
    }})

    return {
      code: 201, 
      message: 'Usuario creado con éxito',
    };
  }

  async findClients(){
    return await prisma.user.findMany({where:{tipo:'cliente'}})
  }

  async findClientById(userId){
    const id = await prisma.user.findMany({where:{id:parseInt(userId)}})
    return id
  }

  async findClientByUuid(uuid){
    const clientData = await prisma.cliente.findFirst(
      {
        where:{
          id:uuid
        },
        include:{user:true}
      })
    if(!clientData) return {code:404,message:"User not found"}
    return  {code:200,data:clientData}
  }

  async deleteClient(id){
    await prisma.user.deleteMany({where:{
      id:id
    }})
  }
}

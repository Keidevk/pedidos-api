import { prisma } from "../../plugins/db.js";

export class RegisterClient {
  constructor(fastify) {}

  async createClient(clientData) {

    await prisma.client.create({data:{
        Cedula:clientData.c_i,
        Nombre:clientData.name,
        Apellido:clientData.lastname,
        Telefono:clientData.phone,
        Contraseña:clientData.password
      }})
  }

  async findClients(){
    return await prisma.client.findMany()
  }
}

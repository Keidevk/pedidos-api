import { prisma } from "../../plugins/db.js";

export class RegisterClient {
  constructor(fastify) {}

  async createClient(clientData) {

    await prisma.client.create({data:{
        cedula:clientData.c_i,
        nombre:clientData.name,
        apellido:clientData.lastname,
        telefono:clientData.phone,
        contraseña:clientData.password
      }})
  }

  async findClients(){
    return await prisma.client.findMany()
  }
}

import { hashPassword, verifyPassword } from "../../plugins/crypt.js";
import { prisma } from "../../plugins/db.js";

export class registerShop {
    constructor(fastify) {}

    async createShop(shopData){

        const Password = await hashPassword(shopData.password)
        const data = await prisma.user.findFirst({
            where: {
              email: shopData.email
            },
        });
        
        
        if (data) {
          const verify = verifyPassword(shopData.password,data.contraseña)
          if(verify){ 
            return {
              code: 409, 
              message: 'El usuario ya existe',
            };
          }
        }
        
        const newUser = await prisma.user.create({data:{
            nombre:shopData.name,
            apellido:shopData.lastname,
            telefono:shopData.phone,
            email:shopData.email,
            contraseña:Password,
            tipo:'tienda',
            fechaRegistro:new Date(),
            activo:true,
            fotoPerfil:shopData.picture,
            direccion:shopData.address,
            documento_identidad:shopData.c_i
          }})
        

        await prisma.shop.create({data:{
                userId: newUser.id,
                nombre: 'Nombre temporal',
                descripcion: 'Temporal Descripcion',
                ubicacion: newUser.direccion,
                horarioApertura: new Date(),
                horarioCierre: new Date(),
                tiempoEntregaPromedio: 0,
                costoEnvio: 0,
                rating: 0,
                fotosTienda: [],
            },
        })

      return {
        code: 201, 
        message: 'Usuario creado con éxito',
      };
    }

    async getTenShops(){
        return await prisma.shop.findMany({
            take:10,
            orderBy:{
                rating:'desc'
            }
            
        })
    }
    async getById(id){
        const num = id
        return await prisma.shop.findFirst({where:{id:id}})
    }
}
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
            fotoPerfil:'',
            direccion:shopData.address,
            documento_identidad:shopData.c_i
          }})
        

        await prisma.shop.create({data:{
                userId: newUser.id,
                nombre: 'Nombre temporal',
                descripcion: 'Temporal Descripcion',
                ubicacion: 'Dirección Temporal',
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

    async updateShopData(userId,shopData){
      console.log(shopData)
      const data = await prisma.user.findFirst({
        where:{
          id:userId
        },
        include:{
          tienda:true
        }
      })

      if(!data){
        return {code:404,message:'Tienda no encontrada'}
      }

      const newdata = await prisma.shop.update({
        where:{
          id:data.tienda.id
        },
        data:{
          nombre: shopData.nombre,
          descripcion: shopData.descripcion,
          ubicacion: shopData.ubicacion,
          horarioApertura: shopData.horarioApertura,
          horarioCierre: shopData.horarioCierre,
          tiempoEntregaPromedio: shopData.tiempoEntregaPromedio,
        }
      })

      return {code:200, message:"Tienda actualizada"}


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

    async getByUserId(id){
      const userId = id
      return await prisma.shop.findFirst({where:{userId:parseInt(userId)}})
    }

    async getCountDeliveryOnRoad(shopId){
      try {
        const tiendaId = await prisma.user.findFirst({where: {id:shopId},include:{tienda:true}});
        const cantidadDeliveriesAsignados = await prisma.pedido.count({
          where: {
            tiendaId:tiendaId.tienda.id,
            repartidorId: {
              not: null,
            },
          },
        });
        return {shopId , cantidadDeliveriesAsignados };
      }catch (error) {
        console.error('Error al obtener deliveries asignados:', error);
        return { error: 'Error interno del servidor' };
      }
  };

    async getDeliveryOnRoad(shopId){
      const deliverys =  await prisma.pedido.findMany({
      where: {
        tienda: {
          userId: shopId,
        },
        repartidorId: {
          not: null, // solo pedidos que ya tienen repartidor asignado
        }
      },
      include: {
        repartidor: {
          include: {
            user: true
          }
        },
        cliente: {
          include: {
            user: true
          }
        },
        tienda: true,
        detalles: {
          include: {
            producto: true
          }
        }
      }
    });
    if(!deliverys)return {code:200,message:"No hay repartidores llevando tus productos"}
    return{code:200,data:deliverys}
    }
}
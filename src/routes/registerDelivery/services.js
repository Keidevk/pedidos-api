import { hashPassword, verifyPassword } from "../../plugins/crypt.js";
import { prisma } from "../../plugins/db.js";

export default class registerDelivery {
  constructor(fastify) {}

  async createDelivery(deliveryData){
    const Password = await hashPassword(deliveryData.password)
        const data = await prisma.user.findFirst({
        where: {
          email: deliveryData.email
        },
      });
    
    
        if (data) {
          const verify = verifyPassword(deliveryData.password,data.contraseña)
          if(verify){ 
            return {
              code: 409, 
              message: 'El usuario ya existe',
            };
          }
        }
        // const address = clientData.address
        const newUser = await prisma.user.create({data:{
            nombre:deliveryData.name,
            apellido:deliveryData.lastname,
            telefono:deliveryData.phone,
            email:deliveryData.email,
            contraseña:Password,
            tipo:'repartidor',
            fechaRegistro:new Date(),
            activo:true,
            fotoPerfil:"",
            direccion:JSON.stringify(deliveryData.address),
            documento_identidad:deliveryData.c_i
          }})
    
        await prisma.deliveryPerson.create({data:{
          userId:newUser.id,
          disponibilidad:false,
          fotosVehiculo:'',
          licencia:'',
          rating:0,
          tipoVehiculo:'moto',
          ubicacionActual:newUser.direccion,
          vehiculoDescripcion:''
        }})
    
        return {
          code: 201, 
          message: 'Usuario creado con éxito',
        };
  }

  async getDeliveryByUserId(deliveryId){
    const userDelivery = await prisma.user.findFirst({where:{id:deliveryId}})

    if(!userDelivery)return{code:404,message:"user not found"}

    const deliveryData = await prisma.deliveryPerson.findFirst({where:{userId:userDelivery.id}})

    if(!deliveryData)return{code:404,message:"delivery not found"}
    

    return {
    documento_identidad:userDelivery.documento_identidad,
    code: 200,
    data: {
        id: userDelivery.id,
        nombre: userDelivery.nombre,
        apellido: userDelivery.apellido,
        telefono: userDelivery.telefono,
        email: userDelivery.email,
        tipo: userDelivery.tipo,
        fechaRegistro: userDelivery.fechaRegistro,
        activo: userDelivery.activo,
        fotoPerfil: userDelivery.fotoPerfil,
        direccion: userDelivery.direccion ?? deliveryData.ubicacionActual,
        documento_identidad: userDelivery.documento_identidad,
      vehiculo: {
            id: deliveryData.id,
            tipoVehiculo: deliveryData.tipoVehiculo,
            licencia: deliveryData.licencia,
            disponibilidad: deliveryData.disponibilidad,
            rating: deliveryData.rating,
            descripcion: deliveryData.vehiculoDescripcion,
            fotos: deliveryData.fotosVehiculo
            }
        }
    };
}

}
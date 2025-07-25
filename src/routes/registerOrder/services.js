import { prisma } from "../../plugins/db.js";

export class registerOrder{
    constructor(fastify) {}
    
    async createOrder(orderData){
    try {
        const { total, metodoPago, clienteId, tiendaId } = orderData;
        const detalles = JSON.parse(orderData.detalles);
        
        console.log(orderData)

        const user = await prisma.cliente.findFirst({where:{userId:parseInt(clienteId)}})
        if(!user){return{code:404,message:'user dont exist'}}
        // console.log("USERID "+user.id)
        const nuevoPedido = await prisma.pedido.create({
          data: {
            total:parseFloat(total),
            metodoPago,
            estado: 'pendiente', // si tienes enum puedes ajustar aquí
            cliente: { connect: { id: user.id } },
            tienda: { connect: { id: tiendaId } },
            detalles: {
              create: detalles.map((item) => ({
                producto: { connect: { id: item.productoId } },
                cantidad: item.cantidad,
                precioUnitario: item.precio_unitario,
              })),
            },
          },
          include: { detalles: true }
        });

        return {
            code:201,
            message:'Pedido Creado con exito',
            json:nuevoPedido
        }
    } catch (error) {
      console.error(error);
      return {
          code:500,
          message:error
      }
    }
    }

    async getOrderByUserId(userId){
        const user = await prisma.cliente.findFirst({where:{userId:parseInt(userId)}})
        if(!user){return{code:404,message:'user dont exist'}}
        
        const pedidos = await prisma.pedido.findMany({where:{clienteId:user.id}})
        return {
         code:200,
         data:pedidos   
        }
    }
    
    // async getOrderDetailsBy(id){

    //     const pedidosDetallados = await prisma.detallePedido.findFirst({where:{pedidoId:}})

    }
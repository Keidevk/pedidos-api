import { prisma } from "../../plugins/db.js";

export class RegisterProduct{
    constructor(fastify){}

    async createProduct(productData){
        await prisma.product.create({data:{
            tiendaId:productData.tiendaId,
            nombre:productData.nombre,
            descripcion:productData.descripcion,
            precio:productData.precio,
            precioPromocion:productData.precioPromocion,
            categoria:productData.categoria,
            ingrediente:productData.ingrediente,
            disponibilidad:productData.disponibilidad,
            tiempoPreparacion:productData.tiempoPreparacion,
            fotosProducto:productData.fotosProducto,
            destacado:productData.destacado
        }})
    }
    async getProducts(){
        return await prisma.product.findMany()
    }

    async getProductsByShopId(id){
        return await prisma.product.findMany({where:{tiendaId:id}})
    }
    async getProductById(id){
        return await prisma.product.findFirst({where:{id:id}})
    }
}
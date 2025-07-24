import { prisma } from "../../plugins/db.js";

export class RegisterProduct{
    constructor(fastify){}

    async createCategory(categoryData){
        await prisma.categoria.create({data:{
            nombre:categoryData.name,
            icono:categoryData.icon,
        }})
        return {code:201,message:'Categoria creada con exito'}
    }

    async getAllCategory(categoryData){
        const data = await prisma.categoria.findMany()
        return {code:200,data:data}
    }

    async createProduct(productData){
        await prisma.producto.create({data:{
            tiendaId:productData.tiendaId,
            categoriaId:productData.categoriaId,
            nombre:productData.nombre,
            descripcion:productData.descripcion,
            precio:productData.precio,
            stock_actual:productData.stockActual,
            stock_minimo:productData.stockMinimo,
            imagen_url:productData.imagen,
            activo:productData.activo
        }})
        return {code:201,message:'Producto Registrado con exito'}
    }
    async getProducts(){
        const data = await prisma.producto.findMany()
        return {code:200,data:data}
    }

    async getProductsByShopId(id){
        const data = await prisma.producto.findMany({where:{tiendaId:id}})
        return {code:200,data:data}
    }
    async getProductById(id){
        const data = await prisma.producto.findFirst({where:{id:id}})
        return {code:200,data:data}
    }

    async getProductByCategory(category){
        const data = await prisma.producto.findMany({where:{categoriaId:category}})
        return {code:200,data:data}
    }
    async getProductsByShopIdAndProductsId(filterData){
        console.log(filterData)
        return await prisma.producto.findMany({
            where: {
                tiendaId: filterData.tiendaId,
            id: {
                in: filterData.ids.map(id => id),
            },
      },
    });
    }
}
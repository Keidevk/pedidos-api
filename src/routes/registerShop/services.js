import { prisma } from "../../plugins/db.js";

export class registerShop {
    constructor(fastify) {}

    async createShop(shopData){
        console.log(shopData)
        await prisma.shop.create({data:{
            Nombre:shopData.Nombre,
            Descripcion:shopData.Descripcion,
            Ubicacion:shopData.Ubicacion,
            HorarioApertura:shopData.HorarioApertura,
            HorarioCierre:shopData.HorarioCierre,    
            Categoria:shopData.Categoria,
            TiempoEntregaPromedio:shopData.TiempoEntregaPromedio,
            costoEnvio:shopData.costoEnvio,
            rating:shopData.rating,
            fotos_tienda:shopData.fotos_tienda

        }})
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
        return await prisma.shop.findFirst({where:{id:parseInt(id,10)}})
    }
}
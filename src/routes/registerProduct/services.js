import { prisma } from "../../plugins/db.js";
import path from 'path';
import fs from 'fs';
import pumpModule from 'pump';
import util from 'util';
import { pipeline } from "stream/promises";

const pump = util.promisify(pumpModule);
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

    // async uploadFile(request){
    //     // console.log(request.body.file)
        
    //     const fileData = request.body;
        

    //     if (!fileData || !fileData.file) {
    //       return {code:400, error: "Archivo no recibido correctamente" };
    //     }
    
    //     const { filename,file } = fileData;

    //      if (!file.readable || file.destroyed) {
    //      throw new Error('Stream ya consumido');
    //     }
    //     // console.log(fileData)
    //     // console.log('Archivo recibido: ', file);
    //     console.log('Stream recibido:', {
    //       readable: file.readable, // Debe ser true
    //       bytesRead: file.bytesRead, // Debe ser > 0
    //       truncated: file.truncated // Debe ser false
    //     });

    //     // let receivedBytes = 0;
    //     // file.on('data', (chunk) => {
    //     //   receivedBytes += chunk.length;
    //     //   console.log(`Recibidos: ${receivedBytes} bytes`); // Debug en tiempo real
    //     // });
    
    //     const uploadDir = path.join(path.resolve(), 'uploads');
    //     if (!fs.existsSync(uploadDir)) {
    //       fs.mkdirSync(uploadDir);
    //     }
    
    //     const filePath = path.join(uploadDir, filename);
    //     await pipeline(file, fs.createWriteStream(filePath));

    //     // console.log(`Total escrito: ${receivedBytes} bytes`)
    
    //     const fileUrl = `/uploads/${filename}`;
    //     return {code:201, url: fileUrl };
    // }

    async createProduct(productData){
        const tiendaId = await prisma.shop.findFirst({where:{userId:parseInt(productData.tiendaId)}})
        try{
        const newproduct = await prisma.producto.create({data:{
            tiendaId:tiendaId.id,
            categoriaId:productData.categoriaId,
            nombre:productData.nombre,
            descripcion:productData.descripcion,
            precio:productData.precio,
            stock_actual:productData.stock_actual,
            stock_minimo:productData.stock_minimo,
            imagen_url:productData.imagen_url ,
            activo:productData.activo
        }})
        console.log(newproduct)
        }catch(err){
            console.log(err)
        }
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
        const categoria = await prisma.categoria.findFirst({where:{nombre:category}})
        const data = await prisma.producto.findMany({where:{categoriaId:categoria.id}})
        return {code:200,data:data,categoria:categoria}
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
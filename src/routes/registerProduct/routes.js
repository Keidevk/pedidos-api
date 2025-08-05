import { RegisterProduct } from "./services.js";

const registerProduct = async (fastify) => {
    const service = new RegisterProduct(fastify);

    fastify.post('/createcategory',
        async(request, reply) => {
            const category = request.body
            return service.createCategory(category).then(res=>{
                reply.code(res.code).send(res.message);
            })
        }
    )

    fastify.get('/getcategory',
        async (request,reply) => {
            return service.getAllCategory().then(res=>{
                reply.code(res.code).send(res.data);
            })
        }
    )

    fastify.post('/register',
        async (request, reply) => {
        try {
            const {
                nombre,
                descripcion,
                precio,
                stock_actual,
                stock_minimo,
                tiendaId,
                categoriaId
            } = request.body;


//             if (
//               !nombre ||
//               !descripcion ||
//               precio === undefined || precio === null ||
//               stock_actual === undefined || stock_actual === null ||
//               stock_minimo === undefined || stock_minimo === null ||
//               !tiendaId ||
//               !categoriaId
//             ) {
//                 console.log("📦 nombre:", nombre);
// console.log("📝 descripcion:", descripcion);
// console.log("💰 precio:", precio);
// console.log("📦 stock_actual:", stock_actual);
// console.log("📦 stock_minimo:", stock_minimo);
// console.log("🏬 tiendaId:", tiendaId);
// console.log("📂 categoriaId:", categoriaId);

//               return reply.status(400).send({ error: "Todos los campos son obligatorios." });
//             }


            // const image = await service.uploadFile(request,reply);
        
            // if (!image.url) {
            //     return reply.code(400).send(image.error);
            // }
        
            // const product = {
            //   nombre: nombre.value.trim(),
            //   descripcion: descripcion.value.trim(),
            //   precio: parseFloat(precio.value),
            //   stock_actual: parseInt(stock_actual.value),
            //   stock_minimo: parseInt(stock_minimo.value),
            //   activo: true,
            //   tiendaId: tiendaId.value.trim(),
            //   categoriaId: categoriaId.value.trim(),
            //   imagen_url: image.url, 
            // };

        
            console.log(product)
        
          const res = await service.createProduct(product);
            
            return reply.code(200).send("Upload");
        } catch (err) {
            return reply.code(500).send({ error: 'Error al registrar el producto', detail: err.message });
        }
        }
    )

    fastify.get('/getproducts',
        async (request,reply) => {
            return service.getProducts().then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.get('/getproducts/:id',
        async (request,reply) => {
            const id = request.params.id
            return service.getProductsByShopId(id).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )

    fastify.get('/getproducts/userid/:id',
        async (request,reply) => {
            const id = request.params.id
            return service.getProductsByUserId(id).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )

    fastify.get('/getproduct/:id',
        async (request,reply) => {
            const id = request.params.id
            return service.getProductById(id).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.get('/getproductsbycategory/:category',
        async (request,reply) => {
            const category = request.params.category
            return service.getProductByCategory(category).then(res=>{
                reply.code(res.code).send(res.data)
            })
        }
    )
    fastify.post('/preorder/',
        async (request,reply) => {
            const filterData = request.body
            return service.getProductsByShopIdAndProductsId(filterData).then(res=>{
                reply.code(200).send(res)
            })
        })
    
}

export default registerProduct